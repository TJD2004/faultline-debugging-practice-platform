/**
 * One-time migration: pulls every row out of a LIVE MySQL database (the
 * original Faultline schema) and writes it into MongoDB via the app's own
 * Mongoose models — so all the same validation/defaults apply.
 *
 * This is separate from `src/scripts/seed.js`, which only loads the static
 * challenge/achievement/project/daily-challenge/contest content that ships
 * in this repo. This script instead reads from your actual running MySQL
 * database, so it also picks up real user accounts, submissions, bookmarks,
 * and anything you added/edited directly in MySQL after the initial seed.
 *
 * USAGE
 *   cd backend
 *   npm install mysql2          # not a normal dependency of this app anymore —
 *                                 only needed to run this script once
 *   # In .env, alongside MONGODB_URI, add the SOURCE (MySQL) credentials:
 *   #   SOURCE_DB_HOST=127.0.0.1
 *   #   SOURCE_DB_PORT=3306
 *   #   SOURCE_DB_USER=root
 *   #   SOURCE_DB_PASSWORD=yourpassword
 *   #   SOURCE_DB_NAME=faultline
 *   node scripts-onetime/migrateFromMysql.js
 *
 * Safe to re-run: every table is upserted on its natural key (slug, email,
 * activeDate, or a user+challenge/project+createdAt combo for submissions),
 * so running it twice does not create duplicates.
 */

require("dotenv").config();
const mongoose = require("../src/config/db");

let mysql;
try {
  mysql = require("mysql2/promise");
} catch (err) {
  console.error(
    '\n✗ mysql2 is not installed. Run "npm install mysql2" first (only needed for this one-time script).\n'
  );
  process.exit(1);
}

const User = require("../src/models/User");
const Challenge = require("../src/models/Challenge");
const Submission = require("../src/models/Submission");
const DailyChallenge = require("../src/models/DailyChallenge");
const Contest = require("../src/models/Contest");
const Achievement = require("../src/models/Achievement");
const Project = require("../src/models/Project");
const ProjectSubmission = require("../src/models/ProjectSubmission");
const Bookmark = require("../src/models/Bookmark");

function requireSourceEnv() {
  const required = ["SOURCE_DB_HOST", "SOURCE_DB_USER", "SOURCE_DB_NAME"];
  const missing = required.filter((k) => !process.env[k]);
  if (missing.length) {
    console.error(`\n✗ Missing source MySQL env vars: ${missing.join(", ")}`);
    console.error("  Add SOURCE_DB_HOST / SOURCE_DB_PORT / SOURCE_DB_USER / SOURCE_DB_PASSWORD / SOURCE_DB_NAME to .env\n");
    process.exit(1);
  }
}

async function main() {
  requireSourceEnv();
  await mongoose.verifyConnection();

  const mysqlConn = await mysql.createConnection({
    host: process.env.SOURCE_DB_HOST,
    port: Number(process.env.SOURCE_DB_PORT || 3306),
    user: process.env.SOURCE_DB_USER,
    password: process.env.SOURCE_DB_PASSWORD,
    database: process.env.SOURCE_DB_NAME,
  });
  console.log(`✓ Connected to source MySQL database "${process.env.SOURCE_DB_NAME}"`);

  // mysqlId -> mongo ObjectId, per table, so foreign keys can be translated
  const challengeIdMap = new Map();
  const projectIdMap = new Map();
  const contestIdMap = new Map();
  const userIdMap = new Map();

  const stats = {};

  // ---------------------------------------------------------------- challenges
  {
    const [rows] = await mysqlConn.query("SELECT * FROM challenges ORDER BY id");
    for (const r of rows) {
      const doc = await Challenge.findOneAndUpdate(
        { slug: r.slug },
        {
          $set: {
            title: r.title,
            lang: r.lang,
            difficulty: r.difficulty,
            xp: r.xp,
            coins: r.coins,
            bugReport: r.bug_report,
            objective: r.objective,
            hints: typeof r.hints === "string" ? JSON.parse(r.hints) : r.hints,
            expectedOutput: r.expected_output,
            fileName: r.file_name,
            buggyCode: r.buggy_code,
            solutionCode: r.solution_code,
            terminalKind: r.terminal_kind,
            schemaJson: r.schema_json ? (typeof r.schema_json === "string" ? JSON.parse(r.schema_json) : r.schema_json) : null,
            checkRules: typeof r.check_rules === "string" ? JSON.parse(r.check_rules) : r.check_rules,
          },
        },
        { upsert: true, new: true }
      );
      challengeIdMap.set(r.id, doc._id);
    }
    stats.challenges = rows.length;
    console.log(`✓ challenges: ${rows.length}`);
  }

  // ------------------------------------------------------------- achievements
  {
    const [rows] = await mysqlConn.query("SELECT * FROM achievements ORDER BY id").catch(() => [[]]);
    for (const r of rows) {
      await Achievement.findOneAndUpdate(
        { slug: r.slug },
        { $set: { title: r.title, description: r.description, criterionType: r.criterion_type, threshold: r.threshold, icon: r.icon } },
        { upsert: true }
      );
    }
    stats.achievements = rows.length;
    console.log(`✓ achievements: ${rows.length}`);
  }

  // ---------------------------------------------------------------- projects
  {
    const [projectRows] = await mysqlConn.query("SELECT * FROM projects ORDER BY id").catch(() => [[]]);
    const [fileRows] = await mysqlConn.query("SELECT * FROM project_files ORDER BY project_id, position").catch(() => [[]]);

    for (const p of projectRows) {
      const files = fileRows
        .filter((f) => f.project_id === p.id)
        .map((f) => ({
          filePath: f.file_path,
          buggyContent: f.buggy_content,
          solutionContent: f.solution_content,
          isEntryPoint: !!f.is_entry_point,
          position: f.position,
        }));

      const doc = await Project.findOneAndUpdate(
        { slug: p.slug },
        {
          $set: {
            title: p.title,
            lang: p.lang,
            difficulty: p.difficulty,
            xp: p.xp,
            coins: p.coins,
            bugReport: p.bug_report,
            objective: p.objective,
            hints: typeof p.hints === "string" ? JSON.parse(p.hints) : p.hints,
            checkRules: typeof p.check_rules === "string" ? JSON.parse(p.check_rules) : p.check_rules,
            files,
          },
        },
        { upsert: true, new: true }
      );
      projectIdMap.set(p.id, doc._id);
    }
    stats.projects = projectRows.length;
    console.log(`✓ projects: ${projectRows.length} (${fileRows.length} files)`);
  }

  // ---------------------------------------------------------------- contests
  {
    const [contestRows] = await mysqlConn.query("SELECT * FROM contests ORDER BY id").catch(() => [[]]);
    const [ccRows] = await mysqlConn.query("SELECT * FROM contest_challenges ORDER BY contest_id, position").catch(() => [[]]);

    for (const c of contestRows) {
      const challenges = ccRows
        .filter((cc) => cc.contest_id === c.id)
        .map((cc) => {
          const challengeObjectId = challengeIdMap.get(cc.challenge_id);
          if (!challengeObjectId) {
            console.warn(`  ! contest "${c.slug}": challenge_id ${cc.challenge_id} not found, skipping link`);
            return null;
          }
          return { challenge: challengeObjectId, position: cc.position };
        })
        .filter(Boolean);

      const doc = await Contest.findOneAndUpdate(
        { slug: c.slug },
        { $set: { title: c.title, description: c.description, startTime: c.start_time, endTime: c.end_time, challenges } },
        { upsert: true, new: true }
      );
      contestIdMap.set(c.id, doc._id);
    }
    stats.contests = contestRows.length;
    console.log(`✓ contests: ${contestRows.length} (${ccRows.length} challenge links)`);
  }

  // --------------------------------------------------------- daily_challenges
  {
    const [rows] = await mysqlConn.query("SELECT * FROM daily_challenges").catch(() => [[]]);
    let skipped = 0;
    for (const r of rows) {
      const challengeObjectId = challengeIdMap.get(r.challenge_id);
      if (!challengeObjectId) {
        skipped++;
        continue;
      }
      await DailyChallenge.findOneAndUpdate(
        { activeDate: r.active_date },
        { $set: { challenge: challengeObjectId, bonusMultiplier: Number(r.bonus_multiplier) } },
        { upsert: true }
      );
    }
    stats.dailyChallenges = rows.length;
    console.log(`✓ daily_challenges: ${rows.length}${skipped ? ` (${skipped} skipped, unknown challenge_id)` : ""}`);
  }

  // -------------------------------------------------------------------- users
  {
    const [rows] = await mysqlConn.query("SELECT * FROM users ORDER BY id");
    for (const r of rows) {
      const doc = await User.findOneAndUpdate(
        { email: r.email.toLowerCase() },
        {
          $set: {
            name: r.name,
            email: r.email.toLowerCase(),
            passwordHash: r.password_hash,
            googleId: r.google_id,
            avatarUrl: r.avatar_url,
            xp: r.xp,
            coins: r.coins,
            streak: r.streak,
            title: r.title,
            createdAt: r.created_at,
          },
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
      userIdMap.set(r.id, doc._id);
    }
    stats.users = rows.length;
    console.log(`✓ users: ${rows.length}`);
  }

  // ------------------------------------------------------------- submissions
  {
    const [rows] = await mysqlConn.query("SELECT * FROM submissions ORDER BY id");
    let inserted = 0,
      skippedMissingRef = 0,
      skippedDuplicate = 0;
    for (const r of rows) {
      const userObjectId = userIdMap.get(r.user_id);
      const challengeObjectId = challengeIdMap.get(r.challenge_id);
      if (!userObjectId || !challengeObjectId) {
        skippedMissingRef++;
        continue;
      }
      // No natural unique key on this table in the original schema, so we
      // dedupe on (user, challenge, createdAt) — good enough to make re-runs
      // idempotent without a real primary key to upsert on.
      const exists = await Submission.exists({ user: userObjectId, challenge: challengeObjectId, createdAt: r.created_at });
      if (exists) {
        skippedDuplicate++;
        continue;
      }
      await Submission.create({
        user: userObjectId,
        challenge: challengeObjectId,
        status: r.status,
        attempts: r.attempts,
        usedSolution: !!r.used_solution,
        xpEarned: r.xp_earned,
        coinsEarned: r.coins_earned,
        submittedCode: r.submitted_code,
        createdAt: r.created_at,
      });
      inserted++;
    }
    stats.submissions = rows.length;
    console.log(`✓ submissions: ${inserted} inserted, ${skippedDuplicate} already present, ${skippedMissingRef} skipped (missing user/challenge)`);
  }

  // --------------------------------------------------------------- bookmarks
  {
    const [rows] = await mysqlConn.query("SELECT * FROM bookmarks").catch(() => [[]]);
    let inserted = 0,
      skipped = 0;
    for (const r of rows) {
      const userObjectId = userIdMap.get(r.user_id);
      const challengeObjectId = challengeIdMap.get(r.challenge_id);
      if (!userObjectId || !challengeObjectId) {
        skipped++;
        continue;
      }
      const result = await Bookmark.findOneAndUpdate(
        { user: userObjectId, challenge: challengeObjectId },
        { $setOnInsert: { createdAt: r.created_at } },
        { upsert: true, new: true, rawResult: true }
      );
      if (result.lastErrorObject?.upserted) inserted++;
    }
    stats.bookmarks = rows.length;
    console.log(`✓ bookmarks: ${inserted} inserted (of ${rows.length}), ${skipped} skipped`);
  }

  // ------------------------------------------------------- project_submissions
  {
    const [rows] = await mysqlConn.query("SELECT * FROM project_submissions").catch(() => [[]]);
    let inserted = 0,
      skippedMissingRef = 0,
      skippedDuplicate = 0;
    for (const r of rows) {
      const userObjectId = userIdMap.get(r.user_id);
      const projectObjectId = projectIdMap.get(r.project_id);
      if (!userObjectId || !projectObjectId) {
        skippedMissingRef++;
        continue;
      }
      const exists = await ProjectSubmission.exists({ user: userObjectId, project: projectObjectId, createdAt: r.created_at });
      if (exists) {
        skippedDuplicate++;
        continue;
      }
      await ProjectSubmission.create({
        user: userObjectId,
        project: projectObjectId,
        status: r.status,
        attempts: r.attempts,
        xpEarned: r.xp_earned,
        coinsEarned: r.coins_earned,
        createdAt: r.created_at,
      });
      inserted++;
    }
    stats.projectSubmissions = rows.length;
    console.log(`✓ project_submissions: ${inserted} inserted, ${skippedDuplicate} already present, ${skippedMissingRef} skipped`);
  }

  await mysqlConn.end();
  console.log("\nDone. Row counts read from MySQL:", stats);
  process.exit(0);
}

main().catch((err) => {
  console.error("\n✗ Migration failed:", err);
  process.exit(1);
});

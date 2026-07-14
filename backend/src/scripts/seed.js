require("dotenv").config();
const mongoose = require("../config/db");

const Challenge = require("../models/Challenge");
const Achievement = require("../models/Achievement");
const Project = require("../models/Project");
const DailyChallenge = require("../models/DailyChallenge");
const Contest = require("../models/Contest");

const { CHALLENGES } = require("../data/challenges");
const { ACHIEVEMENTS } = require("../data/achievements");
const { PROJECTS } = require("../data/projects");
const { DAILY_CHALLENGES } = require("../data/dailyChallenges");
const { CONTESTS } = require("../data/contests");

function localMidnight(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

// Reproduces the three date-expression shapes used by the original SQL seed
// files, evaluated relative to "now" — so re-running this script always
// produces a fresh, currently-relevant daily/contest schedule.
function evalSchedule(schedule, now) {
  if (schedule.kind === "now") return new Date(now);
  if (schedule.kind === "nowPlusDays") {
    const d = new Date(now);
    d.setDate(d.getDate() + schedule.days);
    return d;
  }
  if (schedule.kind === "upcomingSaturdayPlusDaysAtTime") {
    const daysUntilSaturday = 6 - now.getDay(); // JS getDay(): 0=Sun..6=Sat
    const d = localMidnight(now);
    d.setDate(d.getDate() + daysUntilSaturday + schedule.extraDays);
    d.setHours(schedule.hour, schedule.minute, schedule.second, 0);
    return d;
  }
  throw new Error("Unknown schedule kind: " + schedule.kind);
}

async function seedChallenges() {
  console.log(`Seeding ${CHALLENGES.length} challenges...`);
  for (const c of CHALLENGES) {
    await Challenge.updateOne(
      { slug: c.slug },
      {
        $set: {
          title: c.title,
          lang: c.lang,
          difficulty: c.difficulty,
          xp: c.xp,
          coins: c.coins,
          bugReport: c.bugReport,
          objective: c.objective,
          hints: c.hints,
          expectedOutput: c.expectedOutput,
          fileName: c.fileName,
          buggyCode: c.buggyCode,
          solutionCode: c.solution,
          terminalKind: c.terminalKind,
          schemaJson: c.schemaJson ?? null,
          checkRules: c.checkRules,
        },
      },
      { upsert: true }
    );
  }
  console.log("  ✓ challenges done");
}

async function seedAchievements() {
  console.log(`Seeding ${ACHIEVEMENTS.length} achievements...`);
  for (const a of ACHIEVEMENTS) {
    await Achievement.updateOne(
      { slug: a.slug },
      { $set: { title: a.title, description: a.description, criterionType: a.criterionType, threshold: a.threshold, icon: a.icon } },
      { upsert: true }
    );
  }
  console.log("  ✓ achievements done");
}

async function seedProjects() {
  console.log(`Seeding ${PROJECTS.length} project(s)...`);
  for (const p of PROJECTS) {
    await Project.updateOne(
      { slug: p.slug },
      {
        $set: {
          title: p.title,
          lang: p.lang,
          difficulty: p.difficulty,
          xp: p.xp,
          coins: p.coins,
          bugReport: p.bugReport,
          objective: p.objective,
          hints: p.hints,
          checkRules: p.checkRules,
          files: p.files,
        },
      },
      { upsert: true }
    );
  }
  console.log("  ✓ projects done");
}

async function seedDailyChallenges(now) {
  console.log(`Seeding ${DAILY_CHALLENGES.length} daily challenge slots...`);
  const today = localMidnight(now);
  let skipped = 0;
  for (const d of DAILY_CHALLENGES) {
    const challenge = await Challenge.findOne({ slug: d.challengeSlug }, "_id");
    if (!challenge) {
      console.warn(`  ! skipping daily slot for unknown challenge slug "${d.challengeSlug}"`);
      skipped++;
      continue;
    }
    const activeDate = new Date(today);
    activeDate.setDate(activeDate.getDate() + d.dayOffset);

    await DailyChallenge.updateOne(
      { activeDate },
      { $set: { challenge: challenge._id, bonusMultiplier: d.bonusMultiplier } },
      { upsert: true }
    );
  }
  console.log(`  ✓ daily challenges done${skipped ? ` (${skipped} skipped)` : ""}`);
}

async function seedContests(now) {
  console.log(`Seeding ${CONTESTS.length} contests...`);
  for (const c of CONTESTS) {
    const startTime = evalSchedule(c.startSchedule, now);
    const endTime = evalSchedule(c.endSchedule, now);

    const challengeDocs = await Promise.all(
      c.challenges.map(async (cc) => {
        const challenge = await Challenge.findOne({ slug: cc.challengeSlug }, "_id");
        if (!challenge) {
          console.warn(`  ! skipping contest challenge "${cc.challengeSlug}" in "${c.slug}" (not found)`);
          return null;
        }
        return { challenge: challenge._id, position: cc.position };
      })
    );

    await Contest.updateOne(
      { slug: c.slug },
      {
        $set: {
          title: c.title,
          description: c.description,
          startTime,
          endTime,
          challenges: challengeDocs.filter(Boolean),
        },
      },
      { upsert: true }
    );
  }
  console.log("  ✓ contests done");
}

async function seed() {
  await mongoose.verifyConnection();
  const now = new Date();

  await seedChallenges();
  await seedAchievements();
  await seedProjects();
  await seedDailyChallenges(now);
  await seedContests(now);

  console.log("\nAll done.");
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});

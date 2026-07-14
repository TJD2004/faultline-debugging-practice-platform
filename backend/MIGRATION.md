# MySQL → MongoDB migration notes

This backend was originally built on MySQL with hand-written SQL (no ORM). It's
now on MongoDB via [Mongoose](https://mongoosejs.com/). This doc covers what
changed, why, and anything worth knowing if you're comparing against an older
checkout.

## Why

Deployment friction with the MySQL setup — MongoDB Atlas has a simpler
free-tier path for this kind of small app.

## What changed

- **Models** (`src/models/`) replace raw SQL. Each MySQL table has a matching
  Mongoose schema, with two deliberate simplifications now that we're not
  constrained to flat relational tables:
  - `contest_challenges` (a join table) is now embedded directly on `Contest`
    as a `challenges: [{ challenge, position }]` array.
  - `project_files` is now embedded directly on `Project` as a `files: [...]`
    array — a project's files are never queried independently of the project.
- **Config/middleware** (`config/db.js`, `config/passport.js`,
  `middleware/authMiddleware.js`) now talk to Mongoose/MongoDB instead of a
  `mysql2` pool. JWTs still just carry `{ id }` — it's a Mongo ObjectId string
  now instead of a MySQL auto-increment int, but nothing else about the token
  changed.
- **Controllers** — every controller was rewritten against the new models.
  The **HTTP contract is unchanged**: same routes, same request/response JSON
  shapes (including the handful of snake_case fields the frontend/mobile
  already depended on, like `used_solution`, `xp_earned`, `bonus_multiplier`,
  `file_path` on project files, etc.) — so the frontend and mobile apps did
  not need any changes.
- **Transactions** — submission recording + XP/coin awarding still happens
  atomically, now via `mongoose.startSession()` + `withTransaction()` instead
  of MySQL's `beginTransaction`/`commit`/`rollback`. This requires MongoDB to
  be running as a replica set, which Atlas always is (including the free
  tier) — a bare standalone `mongod` does not support transactions.
- **Seed data** (`src/data/*.js`) — all the content that used to live across
  `sql/002_more_challenges.sql`, `sql/004_seed_features.sql`, and
  `sql/007_daily_and_contest_content.sql` (182 challenges, 8 achievements, 1
  project, 30 daily-challenge slots, 13 contests, 100 contest-challenge links)
  was mechanically extracted and converted into plain JS data files. Nothing
  was hand-retyped — a small parser (kept in this repo's history, not shipped)
  walked each SQL file's actual `INSERT` statements so the content is exactly
  what was in the original database, including every JSON-encoded `hints`/
  `checkRules` field. Counts were verified to match the original SQL exactly.
  - `dailyChallenges.js` stores each entry as a **relative** `dayOffset`
    (0 = the day you run the seed script) rather than a fixed date, and
    `contests.js` stores start/end times as relative schedule descriptors
    (e.g. "the upcoming Saturday + N days at 19:00") — matching the original
    SQL's use of `CURDATE()`/`DATE_ADD(NOW(), ...)`. `scripts/seed.js`
    evaluates these relative to "now" each time it runs, so re-running the
    seed script at any point in the future still produces a sensible,
    currently-relevant schedule — exactly like re-running the original SQL
    would have.
  - One dataset quirk carried over faithfully: `sql/004` and `sql/007` both
    define daily-challenge slots for day offsets 0–6, and because the
    original schema enforced a unique `active_date`, whichever migration ran
    last (007) is the one that actually ended up live. `dailyChallenges.js`
    reproduces that outcome directly rather than including both.
- **`npm run seed`** now seeds all five collections in one run (previously
  this required manually running several `.sql` files in MySQL Workbench, in
  a specific order). It's idempotent — safe to re-run any time (e.g. to push
  the daily-challenge/contest schedule further into the future) via `upsert`
  on each item's natural key (`slug`, or `activeDate` for daily challenges).
- **No more `db:init`/schema-creation step.** Mongoose creates collections
  and indexes automatically from the model definitions on first write, so
  there's no MongoDB equivalent of `schema.sql` to run first.

## What did *not* change

- Every API route, its auth requirements, and its request/response shape.
- The checker engine (`utils/evaluateChallenge.js`) — `checkRules` are stored
  as plain JS on the Mongo documents now instead of being `JSON.parse`d out of
  a MySQL `JSON` column, but the rule format and evaluation logic are
  identical.
- The frontend and mobile apps — no changes needed.

## Reference

The original SQL files are kept, unused, in `sql-legacy/` in case you want to
cross-check content or logic against them.

## Migrating a live MySQL database's real data

Everything above only covers the static seed content that ships in this repo
(challenges, achievements, projects, daily-challenge schedule, contests). If
you have a **live** MySQL database with real user accounts, submissions,
bookmarks, etc., that's separate — use `scripts-onetime/migrateFromMysql.js`.

```bash
cd backend
npm install mysql2   # only needed for this one-time script, not by the app itself
```

Add your MySQL source credentials to `.env` (see the commented-out
`SOURCE_DB_*` block in `.env.example`), alongside your already-configured
`MONGODB_URI`, then:

```bash
node scripts-onetime/migrateFromMysql.js
```

What it does:

- Reads every row from every table in your live MySQL database and writes it
  into MongoDB through the app's own Mongoose models.
- Translates every foreign key: MySQL's integer `id`s (`user_id`,
  `challenge_id`, `project_id`, `contest_id`) become the corresponding
  document's new MongoDB `ObjectId` as it migrates each table, in dependency
  order (challenges → achievements → projects → contests → daily challenges →
  users → submissions → bookmarks → project submissions).
- Treats your live MySQL data as authoritative for the reference tables too
  (challenges, achievements, projects, contests, daily challenges) — in case
  you'd added or edited anything directly in MySQL after the original seed,
  those changes come across as well, not just what's in this repo's seed data.
- Is safe to re-run: reference tables upsert on their slug, users upsert on
  email, bookmarks upsert on the user+challenge pair, and submissions /
  project submissions dedupe on user+challenge (or project)+createdAt, since
  the original MySQL schema had no natural unique key on those two tables.
- Leaves your MySQL database untouched — this only reads from it.

Once you've verified everything came across correctly, you can remove the
`SOURCE_DB_*` lines from `.env` and `npm uninstall mysql2` — neither is needed
for the app to run day to day.

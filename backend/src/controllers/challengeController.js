const Challenge = require("../models/Challenge");
const DailyChallenge = require("../models/DailyChallenge");
const Contest = require("../models/Contest");
const { evaluateCode } = require("../utils/evaluateChallenge");

function startOfToday() {
  const d = new Date();
  d.setUTCHours(0, 0, 0, 0);
  return d;
}

// GET /api/challenges  — list, metadata only (no solution/check logic)
// A challenge is hidden from this general list while it's still exclusive to
// a pending/today's Daily Challenge slot, or belongs to a contest that hasn't
// ended yet. Once that date passes / the contest ends, it reappears here
// automatically — this is a pure read-time computation, nothing to run on a
// schedule and nothing to update by hand.
async function listChallenges(req, res) {
  try {
    const now = new Date();

    const [activeDailyChallengeIds, activeContests] = await Promise.all([
      DailyChallenge.find({ activeDate: { $gte: startOfToday() } }).distinct("challenge"),
      Contest.find({ endTime: { $gt: now } }, { "challenges.challenge": 1 }),
    ]);

    const excludedIds = new Set(activeDailyChallengeIds.map((id) => id.toString()));
    for (const contest of activeContests) {
      for (const cc of contest.challenges) excludedIds.add(cc.challenge.toString());
    }

    const challenges = await Challenge.find(
      { _id: { $nin: [...excludedIds] } },
      "slug title lang difficulty xp coins fileName terminalKind"
    ).sort({ _id: 1 });

    res.json({
      challenges: challenges.map((c) => ({
        id: c._id.toString(),
        slug: c.slug,
        title: c.title,
        lang: c.lang,
        difficulty: c.difficulty,
        xp: c.xp,
        coins: c.coins,
        file_name: c.fileName,
        terminal_kind: c.terminalKind,
      })),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not load challenges" });
  }
}

// GET /api/challenges/:slug  — full metadata for the challenge screen
// Deliberately excludes solutionCode and checkRules from the response.
async function getChallenge(req, res) {
  try {
    const c = await Challenge.findOne({ slug: req.params.slug });
    if (!c) return res.status(404).json({ error: "Challenge not found" });
    res.json({
      challenge: {
        id: c._id.toString(),
        slug: c.slug,
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
        terminalKind: c.terminalKind,
        schema: c.schemaJson,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not load challenge" });
  }
}

// POST /api/challenges/:slug/run  { code }  (protected)
// Runs the server-side checker WITHOUT recording a submission.
async function runChallenge(req, res) {
  try {
    const c = await Challenge.findOne({ slug: req.params.slug }, "checkRules");
    if (!c) return res.status(404).json({ error: "Challenge not found" });

    const { code } = req.body;
    if (typeof code !== "string") return res.status(400).json({ error: "code is required" });

    const result = evaluateCode(code, c.checkRules);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not evaluate submission" });
  }
}

// GET /api/challenges/:slug/solution  (protected)
// Revealing the solution is logged client-side as usedSolution on submit,
// which reduces the reward — see submissionController.
async function getSolution(req, res) {
  try {
    const c = await Challenge.findOne({ slug: req.params.slug }, "solutionCode");
    if (!c) return res.status(404).json({ error: "Challenge not found" });
    res.json({ solution: c.solutionCode });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not load solution" });
  }
}

module.exports = { listChallenges, getChallenge, runChallenge, getSolution };

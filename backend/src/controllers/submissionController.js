const mongoose = require("mongoose");
const Challenge = require("../models/Challenge");
const Submission = require("../models/Submission");
const DailyChallenge = require("../models/DailyChallenge");
const User = require("../models/User");
const { evaluateCode } = require("../utils/evaluateChallenge");

function startOfToday() {
  const d = new Date();
  d.setUTCHours(0, 0, 0, 0);
  return d;
}
function startOfTomorrow() {
  const d = startOfToday();
  d.setUTCDate(d.getUTCDate() + 1);
  return d;
}

// POST /api/challenges/:slug/submit  { code, attempts, usedSolution }  (protected)
async function submitChallenge(req, res) {
  try {
    const challenge = await Challenge.findOne({ slug: req.params.slug }, "xp coins checkRules");
    if (!challenge) return res.status(404).json({ error: "Challenge not found" });

    const { code, attempts = 1, usedSolution = false } = req.body;
    if (typeof code !== "string") return res.status(400).json({ error: "code is required" });

    // Re-validate server-side. Never trust a "pass" claimed by the client.
    const result = evaluateCode(code, challenge.checkRules);
    if (!result.success) {
      return res.status(400).json({ error: "Submission does not pass yet", errors: result.errors });
    }

    const xpEarned0 = usedSolution ? Math.round(challenge.xp * 0.3) : challenge.xp;
    const coinsEarned0 = usedSolution ? Math.round(challenge.coins * 0.3) : challenge.coins;

    // If this challenge is today's Daily Challenge, apply its bonus multiplier
    // (skipped when a solution was revealed — no bonus on a reduced-reward pass).
    let dailyBonusApplied = false;
    let xpEarned = xpEarned0;
    let coinsEarned = coinsEarned0;
    if (!usedSolution) {
      const dailyRow = await DailyChallenge.findOne({
        challenge: challenge._id,
        activeDate: { $gte: startOfToday(), $lt: startOfTomorrow() },
      });
      if (dailyRow) {
        const mult = dailyRow.bonusMultiplier;
        xpEarned = Math.round(xpEarned0 * mult);
        coinsEarned = Math.round(coinsEarned0 * mult);
        dailyBonusApplied = true;
      }
    }

    const session = await mongoose.startSession();
    try {
      await session.withTransaction(async () => {
        await Submission.create(
          [
            {
              user: req.user.id,
              challenge: challenge._id,
              status: "Passed",
              attempts,
              usedSolution,
              xpEarned,
              coinsEarned,
              submittedCode: code,
            },
          ],
          { session }
        );

        await User.updateOne(
          { _id: req.user.id },
          { $inc: { xp: xpEarned, coins: coinsEarned } },
          { session }
        );
      });
    } finally {
      await session.endSession();
    }

    res.status(201).json({ xpEarned, coinsEarned, dailyBonusApplied });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Submission failed" });
  }
}

// GET /api/submissions  (protected) — current user's submission history
async function mySubmissions(req, res) {
  try {
    const submissions = await Submission.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .populate("challenge", "title lang slug");

    res.json({
      submissions: submissions
        .filter((s) => s.challenge) // guard against a since-deleted challenge
        .map((s) => ({
          id: s._id.toString(),
          status: s.status,
          attempts: s.attempts,
          used_solution: s.usedSolution,
          xp_earned: s.xpEarned,
          coins_earned: s.coinsEarned,
          created_at: s.createdAt,
          title: s.challenge.title,
          lang: s.challenge.lang,
          slug: s.challenge.slug,
        })),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not load submissions" });
  }
}

module.exports = { submitChallenge, mySubmissions };

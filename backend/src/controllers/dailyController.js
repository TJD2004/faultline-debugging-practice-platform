const DailyChallenge = require("../models/DailyChallenge");
const Submission = require("../models/Submission");

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

// GET /api/daily/today  (protected — needs the user to compute completedToday)
async function getToday(req, res) {
  try {
    const row = await DailyChallenge.findOne({
      activeDate: { $gte: startOfToday(), $lt: startOfTomorrow() },
    }).populate("challenge", "slug title lang difficulty xp coins fileName terminalKind");

    if (!row || !row.challenge) return res.json({ daily: null });

    const count = await Submission.countDocuments({
      user: req.user.id,
      challenge: row.challenge._id,
      createdAt: { $gte: startOfToday(), $lt: startOfTomorrow() },
    });

    res.json({
      daily: {
        active_date: row.activeDate,
        bonus_multiplier: row.bonusMultiplier,
        challenge_id: row.challenge._id.toString(),
        slug: row.challenge.slug,
        title: row.challenge.title,
        lang: row.challenge.lang,
        difficulty: row.challenge.difficulty,
        xp: row.challenge.xp,
        coins: row.challenge.coins,
        file_name: row.challenge.fileName,
        terminal_kind: row.challenge.terminalKind,
        completedToday: count > 0,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not load today's challenge" });
  }
}

module.exports = { getToday };

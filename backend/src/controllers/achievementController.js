const mongoose = require("mongoose");
const Achievement = require("../models/Achievement");
const Submission = require("../models/Submission");

// GET /api/achievements  (protected)
async function getAchievements(req, res) {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);

    const [defs, [agg]] = await Promise.all([
      Achievement.find().sort({ threshold: 1 }),
      Submission.aggregate([
        { $match: { user: userId } },
        { $lookup: { from: "challenges", localField: "challenge", foreignField: "_id", as: "c" } },
        { $unwind: "$c" },
        {
          $group: {
            _id: null,
            total_solves: { $sum: 1 },
            languages: { $addToSet: "$c.lang" },
            hard_solves: { $sum: { $cond: [{ $eq: ["$c.difficulty", "Hard"] }, 1, 0] } },
          },
        },
      ]),
    ]);

    const stats = {
      total_solves: agg ? agg.total_solves : 0,
      language_count: agg ? agg.languages.length : 0,
      hard_solves: agg ? agg.hard_solves : 0,
      xp_total: req.user.xp,
      streak: req.user.streak,
      coins_total: req.user.coins,
    };

    const achievements = defs.map((a) => {
      const progress = stats[a.criterionType] ?? 0;
      return {
        slug: a.slug,
        title: a.title,
        description: a.description,
        icon: a.icon,
        threshold: a.threshold,
        progress: Math.min(progress, a.threshold),
        unlocked: progress >= a.threshold,
      };
    });

    res.json({ achievements });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not load achievements" });
  }
}

module.exports = { getAchievements };

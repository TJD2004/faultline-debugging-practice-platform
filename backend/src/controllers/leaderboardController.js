const User = require("../models/User");

// GET /api/leaderboard
async function getLeaderboard(req, res) {
  try {
    const users = await User.find({}, "name xp coins streak title").sort({ xp: -1 }).limit(50);
    res.json({
      leaderboard: users.map((u, i) => ({
        rank: i + 1,
        id: u._id.toString(),
        name: u.name,
        xp: u.xp,
        coins: u.coins,
        streak: u.streak,
        title: u.title,
      })),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not load leaderboard" });
  }
}

module.exports = { getLeaderboard };

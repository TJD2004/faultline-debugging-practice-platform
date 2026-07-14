const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../models/User");

async function protect(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Not authorized, no token" });
  }
  try {
    const token = header.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!mongoose.isValidObjectId(decoded.id)) {
      return res.status(401).json({ error: "Not authorized, token invalid" });
    }

    const user = await User.findById(decoded.id).select("name email avatarUrl xp coins streak title");
    if (!user) return res.status(401).json({ error: "User no longer exists" });

    req.user = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      avatarUrl: user.avatarUrl,
      xp: user.xp,
      coins: user.coins,
      streak: user.streak,
      title: user.title,
    };
    next();
  } catch (err) {
    return res.status(401).json({ error: "Not authorized, token invalid" });
  }
}

module.exports = { protect };

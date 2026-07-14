const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 120 },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true, maxlength: 255 },
  passwordHash: { type: String, default: null }, // null for OAuth-only accounts
  googleId: { type: String, default: null,sparse: true },
  avatarUrl: { type: String, default: null, maxlength: 500 },
  xp: { type: Number, required: true, default: 0 },
  coins: { type: Number, required: true, default: 0 },
  streak: { type: Number, required: true, default: 0 },
  title: { type: String, required: true, default: "Bug Hunter", maxlength: 60 },
}, { timestamps: { createdAt: "createdAt", updatedAt: false } });

module.exports = mongoose.model("User", userSchema);

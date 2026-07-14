const mongoose = require("mongoose");

const bookmarkSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  challenge: { type: mongoose.Schema.Types.ObjectId, ref: "Challenge", required: true },
}, { timestamps: { createdAt: "createdAt", updatedAt: false } });

bookmarkSchema.index({ user: 1, challenge: 1 }, { unique: true });

module.exports = mongoose.model("Bookmark", bookmarkSchema);

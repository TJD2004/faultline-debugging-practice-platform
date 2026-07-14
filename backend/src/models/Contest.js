const mongoose = require("mongoose");

// A time-boxed event made of a fixed set of challenges. The contest
// leaderboard is computed on the fly from submissions made within
// [startTime, endTime] — no separate scoring collection needed.
const contestSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true, maxlength: 120 },
  title: { type: String, required: true, maxlength: 255 },
  description: { type: String, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  challenges: [
    {
      _id: false,
      challenge: { type: mongoose.Schema.Types.ObjectId, ref: "Challenge", required: true },
      position: { type: Number, required: true, default: 0 },
    },
  ],
}, { timestamps: { createdAt: "createdAt", updatedAt: false } });

module.exports = mongoose.model("Contest", contestSchema);

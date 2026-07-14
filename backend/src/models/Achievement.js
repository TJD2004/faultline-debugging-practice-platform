const mongoose = require("mongoose");

// Fully computed, not tracked — no per-user "unlocked" collection to maintain.
// Adding a new achievement is just one insert; the backend already knows how
// to compute progress for each of these fixed criterionTypes.
const achievementSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true, maxlength: 120 },
  title: { type: String, required: true, maxlength: 255 },
  description: { type: String, required: true },
  criterionType: {
    type: String,
    required: true,
    enum: ["total_solves", "xp_total", "streak", "language_count", "hard_solves", "coins_total"],
  },
  threshold: { type: Number, required: true },
  icon: { type: String, required: true, default: "award", maxlength: 60 },
}, { timestamps: { createdAt: "createdAt", updatedAt: false } });

module.exports = mongoose.model("Achievement", achievementSchema);

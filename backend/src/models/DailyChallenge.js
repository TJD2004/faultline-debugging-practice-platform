const mongoose = require("mongoose");

// One doc per calendar date, pointing at an existing challenge. Submitting
// that specific challenge on that date earns a bonus multiplier.
const dailyChallengeSchema = new mongoose.Schema({
  challenge: { type: mongoose.Schema.Types.ObjectId, ref: "Challenge", required: true },
  // Stored as a UTC midnight Date representing the calendar day.
  activeDate: { type: Date, required: true, unique: true },
  bonusMultiplier: { type: Number, required: true, default: 1.5 },
});

module.exports = mongoose.model("DailyChallenge", dailyChallengeSchema);

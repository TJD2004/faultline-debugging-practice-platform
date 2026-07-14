const mongoose = require("mongoose");

const challengeSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true, trim: true, maxlength: 120 },
  title: { type: String, required: true, maxlength: 255 },
  lang: { type: String, required: true, maxlength: 40 },
  difficulty: { type: String, required: true, enum: ["Easy", "Medium", "Hard", "Expert"] },
  xp: { type: Number, required: true, default: 50 },
  coins: { type: Number, required: true, default: 10 },
  bugReport: { type: String, required: true },
  objective: { type: String, required: true },
  hints: { type: [String], required: true, default: [] },
  expectedOutput: { type: String, required: true },
  fileName: { type: String, required: true, maxlength: 120 },
  buggyCode: { type: String, required: true },
  solutionCode: { type: String, required: true },
  terminalKind: { type: String, required: true, default: "node", maxlength: 40 },
  schemaJson: { type: mongoose.Schema.Types.Mixed, default: null }, // table defs, SQL challenges only
  checkRules: { type: mongoose.Schema.Types.Mixed, required: true, default: [] },
}, { timestamps: { createdAt: "createdAt", updatedAt: false } });

module.exports = mongoose.model("Challenge", challengeSchema);

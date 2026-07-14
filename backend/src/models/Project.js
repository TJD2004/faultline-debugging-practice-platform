const mongoose = require("mongoose");

// A small multi-file codebase. checkRules works like a challenge's, but each
// rule may include an optional "file" key to target one specific file; rules
// with no "file" key test against all files concatenated together.
const projectFileSchema = new mongoose.Schema({
  _id: false,
  filePath: { type: String, required: true, maxlength: 255 },
  buggyContent: { type: String, required: true },
  solutionContent: { type: String, required: true },
  isEntryPoint: { type: Boolean, required: true, default: false },
  position: { type: Number, required: true, default: 0 },
});

const projectSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true, maxlength: 120 },
  title: { type: String, required: true, maxlength: 255 },
  lang: { type: String, required: true, maxlength: 60 },
  difficulty: { type: String, required: true, enum: ["Easy", "Medium", "Hard", "Expert"] },
  xp: { type: Number, required: true, default: 150 },
  coins: { type: Number, required: true, default: 30 },
  bugReport: { type: String, required: true },
  objective: { type: String, required: true },
  hints: { type: [String], required: true, default: [] },
  checkRules: { type: mongoose.Schema.Types.Mixed, required: true, default: [] },
  files: { type: [projectFileSchema], required: true, default: [] },
}, { timestamps: { createdAt: "createdAt", updatedAt: false } });

module.exports = mongoose.model("Project", projectSchema);

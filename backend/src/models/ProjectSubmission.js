const mongoose = require("mongoose");

const projectSubmissionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  project: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
  status: { type: String, required: true, enum: ["Passed", "Failed"], default: "Passed" },
  attempts: { type: Number, required: true, default: 1 },
  xpEarned: { type: Number, required: true, default: 0 },
  coinsEarned: { type: Number, required: true, default: 0 },
}, { timestamps: { createdAt: "createdAt", updatedAt: false } });

projectSubmissionSchema.index({ user: 1 });
projectSubmissionSchema.index({ project: 1 });

module.exports = mongoose.model("ProjectSubmission", projectSubmissionSchema);

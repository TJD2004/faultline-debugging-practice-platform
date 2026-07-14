const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  challenge: { type: mongoose.Schema.Types.ObjectId, ref: "Challenge", required: true },
  status: { type: String, required: true, enum: ["Passed", "Failed"], default: "Passed" },
  attempts: { type: Number, required: true, default: 1 },
  usedSolution: { type: Boolean, required: true, default: false },
  xpEarned: { type: Number, required: true, default: 0 },
  coinsEarned: { type: Number, required: true, default: 0 },
  submittedCode: { type: String, required: true },
}, { timestamps: { createdAt: "createdAt", updatedAt: false } });

submissionSchema.index({ user: 1 });
submissionSchema.index({ challenge: 1 });
submissionSchema.index({ user: 1, challenge: 1, createdAt: 1 });

module.exports = mongoose.model("Submission", submissionSchema);

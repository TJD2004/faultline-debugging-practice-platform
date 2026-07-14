const express = require("express");
const { listChallenges, getChallenge, runChallenge, getSolution } = require("../controllers/challengeController");
const { submitChallenge } = require("../controllers/submissionController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", listChallenges);
router.get("/:slug", getChallenge);
router.post("/:slug/run", protect, runChallenge);
router.post("/:slug/submit", protect, submitChallenge);
router.get("/:slug/solution", protect, getSolution);

module.exports = router;

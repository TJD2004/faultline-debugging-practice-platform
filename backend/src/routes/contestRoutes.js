const express = require("express");
const {
  listContests,
  getNextContest,
  getContest,
  getContestLeaderboard,
  getGlobalContestRanking,
  getMyContestRanking,
} = require("../controllers/contestController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Specific routes MUST come before the /:slug catch-all, or Express would
// treat "next", "ranking", etc. as a contest slug.
router.get("/next", getNextContest);
router.get("/ranking/global", getGlobalContestRanking);
router.get("/ranking/me", protect, getMyContestRanking);

router.get("/", listContests);
router.get("/:slug", protect, getContest);
router.get("/:slug/leaderboard", getContestLeaderboard);

module.exports = router;

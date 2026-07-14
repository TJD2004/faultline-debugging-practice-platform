const express = require("express");
const { listBookmarks, listBookmarkedSlugs, toggleBookmark } = require("../controllers/bookmarkController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();
router.get("/", protect, listBookmarks);
router.get("/slugs", protect, listBookmarkedSlugs);
router.post("/:slug/toggle", protect, toggleBookmark);

module.exports = router;

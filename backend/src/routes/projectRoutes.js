const express = require("express");
const {
  listProjects,
  getProject,
  runProject,
  submitProject,
  getFileSolution,
} = require("../controllers/projectController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();
router.get("/", listProjects);
router.get("/:slug", getProject);
router.post("/:slug/run", protect, runProject);
router.post("/:slug/submit", protect, submitProject);
// Wildcard because file paths contain slashes, e.g. /solution/client/src/api.js
router.get("/:slug/solution/*", protect, getFileSolution);

module.exports = router;

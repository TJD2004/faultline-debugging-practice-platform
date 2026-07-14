const express = require("express");
const { mySubmissions } = require("../controllers/submissionController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();
router.get("/", protect, mySubmissions);

module.exports = router;

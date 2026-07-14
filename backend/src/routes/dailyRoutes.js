const express = require("express");
const { getToday } = require("../controllers/dailyController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();
router.get("/today", protect, getToday);

module.exports = router;

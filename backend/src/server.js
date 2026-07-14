require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("./config/passport");
const mongoose = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const challengeRoutes = require("./routes/challengeRoutes");
const submissionRoutes = require("./routes/submissionRoutes");
const leaderboardRoutes = require("./routes/leaderboardRoutes");
const dailyRoutes = require("./routes/dailyRoutes");
const contestRoutes = require("./routes/contestRoutes");
const achievementRoutes = require("./routes/achievementRoutes");
const projectRoutes = require("./routes/projectRoutes");
const bookmarkRoutes = require("./routes/bookmarkRoutes");

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(passport.initialize());

app.get("/api/health", (req, res) => res.json({ ok: true }));

app.use("/api/auth", authRoutes);
app.use("/api/challenges", challengeRoutes);
app.use("/api/submissions", submissionRoutes);
app.use("/api/leaderboard", leaderboardRoutes);
app.use("/api/daily", dailyRoutes);
app.use("/api/contests", contestRoutes);
app.use("/api/achievements", achievementRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/bookmarks", bookmarkRoutes);

app.use((req, res) => res.status(404).json({ error: "Not found" }));

// Central error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Something went wrong" });
});

const PORT = process.env.PORT || 5000;

mongoose.verifyConnection().then(() => {
  app.listen(PORT, () => console.log(`Faultline API listening on http://localhost:${PORT}`));
});

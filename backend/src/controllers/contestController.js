const mongoose = require("mongoose");
const Contest = require("../models/Contest");
const Submission = require("../models/Submission");

function computeStatus(contest, now) {
  if (now < contest.startTime) return "upcoming";
  if (now >= contest.startTime && now <= contest.endTime) return "active";
  return "ended";
}

function contestSummary(contest, now) {
  return {
    id: contest._id.toString(),
    slug: contest.slug,
    title: contest.title,
    description: contest.description,
    start_time: contest.startTime,
    end_time: contest.endTime,
    status: computeStatus(contest, now),
  };
}

// GET /api/contests
async function listContests(req, res) {
  try {
    const now = new Date();
    const contests = await Contest.find().sort({ startTime: -1 });
    res.json({ contests: contests.map((c) => contestSummary(c, now)) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not load contests" });
  }
}

// GET /api/contests/next — the soonest upcoming (or currently active) contest, for the countdown widget
async function getNextContest(req, res) {
  try {
    const now = new Date();
    const contest = await Contest.findOne({ endTime: { $gt: now } }).sort({ startTime: 1 });
    res.json({ contest: contest ? contestSummary(contest, now) : null });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not load next contest" });
  }
}

// GET /api/contests/:slug  (protected — to compute the current user's completed challenges)
async function getContest(req, res) {
  try {
    const now = new Date();
    const contest = await Contest.findOne({ slug: req.params.slug }).populate({
      path: "challenges.challenge",
      select: "slug title lang difficulty xp coins",
    });
    if (!contest) return res.status(404).json({ error: "Contest not found" });

    const orderedChallenges = [...contest.challenges].sort((a, b) => a.position - b.position);
    const challengeIds = orderedChallenges.map((cc) => cc.challenge._id);

    const completedRows = await Submission.find(
      {
        user: req.user.id,
        challenge: { $in: challengeIds },
        createdAt: { $gte: contest.startTime, $lte: contest.endTime },
      },
      "challenge"
    ).distinct("challenge");

    const idToSlug = new Map(orderedChallenges.map((cc) => [cc.challenge._id.toString(), cc.challenge.slug]));

    res.json({
      contest: contestSummary(contest, now),
      challenges: orderedChallenges.map((cc) => ({
        slug: cc.challenge.slug,
        title: cc.challenge.title,
        lang: cc.challenge.lang,
        difficulty: cc.challenge.difficulty,
        xp: cc.challenge.xp,
        coins: cc.challenge.coins,
        position: cc.position,
      })),
      completedSlugs: completedRows.map((id) => idToSlug.get(id.toString())),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not load contest" });
  }
}

// GET /api/contests/:slug/leaderboard — this one contest's standings
async function getContestLeaderboard(req, res) {
  try {
    const contest = await Contest.findOne({ slug: req.params.slug }, "startTime endTime challenges.challenge");
    if (!contest) return res.status(404).json({ error: "Contest not found" });

    const challengeIds = contest.challenges.map((cc) => cc.challenge);

    const rows = await Submission.aggregate([
      {
        $match: {
          challenge: { $in: challengeIds },
          createdAt: { $gte: contest.startTime, $lte: contest.endTime },
        },
      },
      { $group: { _id: "$user", contest_xp: { $sum: "$xpEarned" }, solves: { $sum: 1 } } },
      { $lookup: { from: "users", localField: "_id", foreignField: "_id", as: "userDoc" } },
      { $unwind: "$userDoc" },
      { $project: { id: "$_id", name: "$userDoc.name", contest_xp: 1, solves: 1, _id: 0 } },
      { $sort: { contest_xp: -1, solves: -1 } },
      { $limit: 50 },
    ]);

    res.json({
      leaderboard: rows.map((r, i) => ({ rank: i + 1, id: r.id.toString(), name: r.name, contest_xp: r.contest_xp, solves: r.solves })),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not load contest leaderboard" });
  }
}

// Shared aggregation: per-user totals across every contest ever run, only
// counting XP earned on a contest's own challenges during that contest's
// own time window. Optionally scoped to a single user.
async function aggregateContestTotals(matchUserId) {
  const pipeline = [
    { $unwind: "$challenges" },
    {
      $lookup: {
        from: "submissions",
        let: { challengeId: "$challenges.challenge", start: "$startTime", end: "$endTime" },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ["$challenge", "$$challengeId"] },
                  { $gte: ["$createdAt", "$$start"] },
                  { $lte: ["$createdAt", "$$end"] },
                  ...(matchUserId ? [{ $eq: ["$user", new mongoose.Types.ObjectId(matchUserId)] }] : []),
                ],
              },
            },
          },
        ],
        as: "subs",
      },
    },
    { $unwind: "$subs" },
    {
      $group: {
        _id: "$subs.user",
        total_contest_xp: { $sum: "$subs.xpEarned" },
        total_contest_solves: { $sum: 1 },
        contestSet: { $addToSet: "$_id" },
      },
    },
    { $lookup: { from: "users", localField: "_id", foreignField: "_id", as: "userDoc" } },
    { $unwind: "$userDoc" },
    {
      $project: {
        _id: 0,
        id: "$_id",
        name: "$userDoc.name",
        total_contest_xp: 1,
        total_contest_solves: 1,
        contests_participated: { $size: "$contestSet" },
      },
    },
    { $sort: { total_contest_xp: -1 } },
  ];
  return Contest.aggregate(pipeline);
}

// GET /api/contests/ranking/global — a real contest rating, aggregated across
// every contest ever run. Separate from the Practice leaderboard entirely:
// only XP earned on contest challenges DURING their contest window counts.
async function getGlobalContestRanking(req, res) {
  try {
    const rows = (await aggregateContestTotals(null)).slice(0, 100);
    res.json({
      ranking: rows.map((r, i) => ({ rank: i + 1, id: r.id.toString(), name: r.name, total_contest_xp: r.total_contest_xp, contests_participated: r.contests_participated, total_contest_solves: r.total_contest_solves })),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not load contest ranking" });
  }
}

// GET /api/contests/ranking/me — the current user's own contest rating summary,
// for the compact widget on Profile.
async function getMyContestRanking(req, res) {
  try {
    const allRows = await aggregateContestTotals(null);
    const myIndex = allRows.findIndex((r) => r.id.toString() === req.user.id.toString());
    const mine = myIndex === -1 ? null : allRows[myIndex];

    res.json({
      totalContestXp: mine ? mine.total_contest_xp : 0,
      contestsParticipated: mine ? mine.contests_participated : 0,
      totalContestSolves: mine ? mine.total_contest_solves : 0,
      globalRank: mine ? myIndex + 1 : null,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not load your contest ranking" });
  }
}

module.exports = {
  listContests,
  getNextContest,
  getContest,
  getContestLeaderboard,
  getGlobalContestRanking,
  getMyContestRanking,
};

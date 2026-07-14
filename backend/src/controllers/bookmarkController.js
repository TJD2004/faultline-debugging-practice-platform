const Challenge = require("../models/Challenge");
const Bookmark = require("../models/Bookmark");

// GET /api/bookmarks  (protected)
async function listBookmarks(req, res) {
  try {
    const bookmarks = await Bookmark.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .populate("challenge", "slug title lang difficulty xp coins");

    res.json({
      bookmarks: bookmarks
        .filter((b) => b.challenge)
        .map((b) => ({
          slug: b.challenge.slug,
          title: b.challenge.title,
          lang: b.challenge.lang,
          difficulty: b.challenge.difficulty,
          xp: b.challenge.xp,
          coins: b.challenge.coins,
          bookmarked_at: b.createdAt,
        })),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not load bookmarks" });
  }
}

// GET /api/bookmarks/slugs  (protected) — just the slugs, for marking cards as bookmarked
async function listBookmarkedSlugs(req, res) {
  try {
    const bookmarks = await Bookmark.find({ user: req.user.id }).populate("challenge", "slug");
    res.json({ slugs: bookmarks.filter((b) => b.challenge).map((b) => b.challenge.slug) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not load bookmarks" });
  }
}

// POST /api/bookmarks/:slug/toggle  (protected)
async function toggleBookmark(req, res) {
  try {
    const challenge = await Challenge.findOne({ slug: req.params.slug }, "_id");
    if (!challenge) return res.status(404).json({ error: "Challenge not found" });

    const existing = await Bookmark.findOne({ user: req.user.id, challenge: challenge._id });
    if (existing) {
      await Bookmark.deleteOne({ _id: existing._id });
      return res.json({ bookmarked: false });
    }

    await Bookmark.create({ user: req.user.id, challenge: challenge._id });
    res.json({ bookmarked: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not update bookmark" });
  }
}

module.exports = { listBookmarks, listBookmarkedSlugs, toggleBookmark };

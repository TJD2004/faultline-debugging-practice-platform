import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Coins, Star, Bookmark, BookmarkCheck, CheckCircle2 } from "lucide-react";
import api from "../api/axios";
import Layout from "../components/Layout";
import GlassCard from "../components/GlassCard";

export default function Practice() {
  const [challenges, setChallenges] = useState([]);
  const [solvedSlugs, setSolvedSlugs] = useState(new Set());
  const [bookmarkedSlugs, setBookmarkedSlugs] = useState(new Set());
  const [searchParams, setSearchParams] = useSearchParams();

  // Filters live in the URL (?lang=Java&difficulty=Easy), not just component
  // state — so they survive navigating to a challenge and back.
  const lang = searchParams.get("lang") || "All";
  const diff = searchParams.get("difficulty") || "All";

  const setLang = (value) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      value === "All" ? next.delete("lang") : next.set("lang", value);
      return next;
    }, { replace: true });
  };

  const setDiff = (value) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      value === "All" ? next.delete("difficulty") : next.set("difficulty", value);
      return next;
    }, { replace: true });
  };

  useEffect(() => {
    api.get("/challenges").then(({ data }) => setChallenges(data.challenges));
    api.get("/submissions").then(({ data }) => {
      setSolvedSlugs(new Set(data.submissions.map((s) => s.slug)));
    });
    api.get("/bookmarks/slugs").then(({ data }) => setBookmarkedSlugs(new Set(data.slugs)));
  }, []);

  const toggleBookmark = async (slug, e) => {
    e.preventDefault();
    e.stopPropagation();
    const { data } = await api.post(`/bookmarks/${slug}/toggle`);
    setBookmarkedSlugs((prev) => {
      const next = new Set(prev);
      if (data.bookmarked) next.add(slug);
      else next.delete(slug);
      return next;
    });
  };

  const langs = ["All", ...new Set(challenges.map((c) => c.lang))];
  const diffs = ["All", "Easy", "Medium", "Hard", "Expert"];
  const filtered = challenges.filter(
    (c) => (lang === "All" || c.lang === lang) && (diff === "All" || c.difficulty === diff)
  );

  return (
    <Layout>
      <div className="p-4 sm:p-6 max-w-6xl mx-auto">
        <h1 className="font-display text-xl sm:text-2xl font-semibold text-text mb-1">Practice</h1>
        <p className="text-xs sm:text-sm text-muted mb-4 sm:mb-6">Pick a bug. Read the report. Fix it for real.</p>

        {/* Horizontally scrolling on mobile instead of wrapping into many rows */}
        <div className="flex sm:flex-wrap gap-2 mb-2.5 sm:mb-3 overflow-x-auto sm:overflow-visible pb-1 -mx-4 px-4 sm:mx-0 sm:px-0">
          {langs.map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className="shrink-0 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-mono border border-border whitespace-nowrap"
              style={{ background: lang === l ? "#7C6FFF" : "#141420", color: lang === l ? "white" : "#8B8BA3" }}
            >
              {l}
            </button>
          ))}
        </div>
        <div className="flex sm:flex-wrap gap-2 mb-4 sm:mb-6 overflow-x-auto sm:overflow-visible pb-1 -mx-4 px-4 sm:mx-0 sm:px-0">
          {diffs.map((d) => (
            <button
              key={d}
              onClick={() => setDiff(d)}
              className="shrink-0 px-2.5 sm:px-3 py-1 rounded-full text-xs border border-border whitespace-nowrap"
              style={{ background: diff === d ? "#1F1F2C" : "transparent", color: diff === d ? "#E7E7EF" : "#8B8BA3" }}
            >
              {d}
            </button>
          ))}
        </div>

        {filtered.length === 0 && (
          <GlassCard className="p-6 sm:p-8 text-center">
            <p className="text-sm text-muted">No challenges match those filters yet.</p>
          </GlassCard>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {filtered.map((c, i) => {
            const solved = solvedSlugs.has(c.slug);
            const bookmarked = bookmarkedSlugs.has(c.slug);
            return (
              <motion.div
                key={c.slug}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.35, ease: "easeOut" }}
                whileHover={{ y: -4, boxShadow: "0 12px 32px -12px rgba(124,111,255,0.35)" }}
              >
                <GlassCard className="p-3.5 sm:p-5 flex flex-col h-full relative" style={solved ? { borderColor: "#34D39955" } : {}}>
                  <button
                    onClick={(e) => toggleBookmark(c.slug, e)}
                    className="absolute top-3 sm:top-4 right-3 sm:right-4 z-10"
                    title={bookmarked ? "Remove bookmark" : "Bookmark this challenge"}
                  >
                    {bookmarked ? (
                      <BookmarkCheck size={16} className="text-warn" />
                    ) : (
                      <Bookmark size={16} className="text-slate-600 hover:text-muted" />
                    )}
                  </button>

                  <div className="flex items-center justify-between mb-2.5 sm:mb-3 pr-6">
                    <span className="px-2 py-0.5 rounded-full text-[11px] sm:text-xs font-mono border border-violet/40 text-violet bg-violet/10">
                      {c.lang}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[11px] sm:text-xs font-mono border border-border text-muted">
                      {c.difficulty}
                    </span>
                  </div>

                  <div className="flex items-start gap-1.5 mb-3 sm:mb-4 flex-1">
                    {solved && <CheckCircle2 size={14} className="text-success mt-0.5 shrink-0" />}
                    <p className="text-[13px] sm:text-sm font-medium text-text leading-snug">{c.title}</p>
                  </div>

                  <div className="flex items-center justify-between text-[11px] sm:text-xs font-mono text-muted mb-3 sm:mb-4">
                    <span className="flex items-center gap-1"><Star size={12} className="text-warn" /> {c.xp} XP</span>
                    <span className="flex items-center gap-1"><Coins size={12} className="text-warn" /> {c.coins}</span>
                  </div>

                  <Link
                    to={`/challenge/${c.slug}`}
                    className="w-full text-center py-2 rounded-lg text-xs sm:text-sm font-medium border"
                    style={{
                      background: solved ? "rgba(52,211,153,0.1)" : "#141420",
                      color: solved ? "#34D399" : "#E7E7EF",
                      borderColor: solved ? "#34D39940" : "#2A2A3A",
                    }}
                  >
                    {solved ? "Solved — practice again" : "Open challenge"}
                  </Link>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}

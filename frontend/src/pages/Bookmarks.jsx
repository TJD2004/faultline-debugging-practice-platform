import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Bookmark, BookmarkX, Star, Coins } from "lucide-react";
import api from "../api/axios";
import Layout from "../components/Layout";
import GlassCard from "../components/GlassCard";

export default function Bookmarks() {
  const [bookmarks, setBookmarks] = useState(null);

  const load = () => api.get("/bookmarks").then(({ data }) => setBookmarks(data.bookmarks));

  useEffect(() => {
    load();
  }, []);

  const remove = async (slug) => {
    await api.post(`/bookmarks/${slug}/toggle`);
    setBookmarks((prev) => prev.filter((b) => b.slug !== slug));
  };

  return (
    <Layout>
      <div className="p-6 max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-2">
          <Bookmark size={22} className="text-violet" />
          <h1 className="font-display text-2xl font-semibold text-text">Bookmarks</h1>
        </div>
        <p className="text-sm text-muted mb-6">Challenges you saved to revisit later.</p>

        {bookmarks === null && <p className="text-sm text-muted">Loading…</p>}

        {bookmarks?.length === 0 && (
          <GlassCard className="p-10 text-center">
            <Bookmark size={20} className="text-slate-600 mx-auto mb-3" />
            <p className="text-sm text-muted">
              No bookmarks yet — tap the bookmark icon on any challenge card in Practice to save it here.
            </p>
          </GlassCard>
        )}

        <div className="space-y-2">
          {bookmarks?.map((b) => (
            <GlassCard key={b.slug} className="p-4 flex items-center gap-3">
              <div className="flex-1 min-w-0">
                <Link to={`/challenge/${b.slug}`} className="text-sm text-text hover:text-violet truncate block">
                  {b.title}
                </Link>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="px-2 py-0.5 rounded-full text-xs font-mono border border-violet/40 text-violet bg-violet/10">
                    {b.lang}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-xs font-mono border border-border text-muted">
                    {b.difficulty}
                  </span>
                  <span className="text-xs font-mono text-warn flex items-center gap-1"><Star size={11} /> {b.xp}</span>
                  <span className="text-xs font-mono text-warn flex items-center gap-1"><Coins size={11} /> {b.coins}</span>
                </div>
              </div>
              <button onClick={() => remove(b.slug)} className="p-2 rounded-lg hover:bg-surface2 text-muted hover:text-error shrink-0" title="Remove bookmark">
                <BookmarkX size={16} />
              </button>
            </GlassCard>
          ))}
        </div>
      </div>
    </Layout>
  );
}

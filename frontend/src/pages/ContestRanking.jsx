import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Trophy, Crown, ArrowLeft } from "lucide-react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import Layout from "../components/Layout";
import GlassCard from "../components/GlassCard";

export default function ContestRanking() {
  const { user } = useAuth();
  const [ranking, setRanking] = useState(null);

  useEffect(() => {
    api.get("/contests/ranking/global").then(({ data }) => setRanking(data.ranking));
  }, []);

  return (
    <Layout>
      <div className="p-6 max-w-3xl mx-auto">
        <Link to="/contest" className="flex items-center gap-1 text-xs text-muted mb-4">
          <ArrowLeft size={12} /> Back to contests
        </Link>
        <div className="flex items-center gap-3 mb-2">
          <Trophy size={22} className="text-violet" />
          <h1 className="font-display text-2xl font-semibold text-text">Contest Ranking</h1>
        </div>
        <p className="text-sm text-muted mb-6">
          Rating earned only from contest submissions, during the contest window — separate from your Practice XP.
        </p>

        {ranking === null && <p className="text-sm text-muted">Loading…</p>}
        {ranking?.length === 0 && (
          <GlassCard className="p-10 text-center">
            <p className="text-sm text-muted">No contest submissions yet — be the first to compete.</p>
          </GlassCard>
        )}

        {ranking?.length > 0 && (
          <GlassCard className="overflow-hidden">
            {ranking.map((r, i) => (
              <div
                key={r.id}
                className="flex items-center gap-4 px-5 py-3.5"
                style={{
                  borderBottom: i < ranking.length - 1 ? "1px solid #1E1E2B" : "none",
                  background: user && r.id === user.id ? "rgba(124,111,255,0.08)" : "transparent",
                }}
              >
                <div className="w-7 text-center">
                  {r.rank <= 3 ? (
                    <Crown size={16} className={["text-warn", "text-slate-300", "text-amber-700"][r.rank - 1]} />
                  ) : (
                    <span className="text-sm font-mono text-muted">{r.rank}</span>
                  )}
                </div>
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold bg-gradient-to-br from-violet to-cyan text-void font-display">
                  {r.name?.[0]?.toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text truncate">
                    {r.name}{user && r.id === user.id ? " (you)" : ""}
                  </p>
                  <p className="text-[11px] text-muted">
                    {r.contests_participated} contest{r.contests_participated !== 1 ? "s" : ""} · {r.total_contest_solves} solve{r.total_contest_solves !== 1 ? "s" : ""}
                  </p>
                </div>
                <p className="text-sm font-mono text-text">{r.total_contest_xp} XP</p>
              </div>
            ))}
          </GlassCard>
        )}
      </div>
    </Layout>
  );
}

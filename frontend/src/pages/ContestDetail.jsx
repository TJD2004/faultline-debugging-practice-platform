import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Crown, CheckCircle2, ChevronRight } from "lucide-react";
import api from "../api/axios";
import Layout from "../components/Layout";
import GlassCard from "../components/GlassCard";
import Pill from "../components/Pill";

export default function ContestDetail() {
  const { slug } = useParams();
  const [data, setData] = useState(null);
  const [leaderboard, setLeaderboard] = useState(null);
  const [tab, setTab] = useState("challenges");

  useEffect(() => {
    api.get(`/contests/${slug}`).then(({ data }) => setData(data));
    api.get(`/contests/${slug}/leaderboard`).then(({ data }) => setLeaderboard(data.leaderboard));
  }, [slug]);

  if (!data) {
    return (
      <Layout>
        <p className="p-6 text-sm text-muted">Loading…</p>
      </Layout>
    );
  }

  const { contest, challenges, completedSlugs } = data;

  return (
    <Layout>
      <div className="p-6 max-w-3xl mx-auto">
        <Link to="/contest" className="text-xs text-muted mb-4 inline-block">← Back to contests</Link>
        <h1 className="font-display text-2xl font-semibold text-text mb-1">{contest.title}</h1>
        <p className="text-sm text-muted mb-6">{contest.description}</p>

        <div className="flex gap-1 mb-5 p-1 rounded-lg bg-surface2 w-fit">
          {["challenges", "leaderboard"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-1.5 rounded-md text-xs font-medium capitalize ${tab === t ? "bg-border text-text" : "text-muted"}`}
            >
              {t}
            </button>
          ))}
        </div>

        {tab === "challenges" && (
          <div className="space-y-2">
            {challenges.map((c) => {
              const done = completedSlugs.includes(c.slug);
              return (
                <Link key={c.slug} to={`/challenge/${c.slug}`}>
                  <GlassCard className="p-4 flex items-center gap-3 hover:brightness-110">
                    {done ? <CheckCircle2 size={16} className="text-success shrink-0" /> : <div className="w-4 h-4 rounded-full border border-border shrink-0" />}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-text truncate">{c.title}</p>
                      <div className="flex gap-1.5 mt-1">
                        <Pill color="#4FD1E8">{c.lang}</Pill>
                        <Pill color="#8B8BA3">{c.difficulty}</Pill>
                      </div>
                    </div>
                    <ChevronRight size={16} className="text-muted" />
                  </GlassCard>
                </Link>
              );
            })}
          </div>
        )}

        {tab === "leaderboard" && (
          <GlassCard className="overflow-hidden">
            {leaderboard === null && <p className="p-5 text-sm text-muted">Loading…</p>}
            {leaderboard?.length === 0 && <p className="p-5 text-sm text-muted">No submissions yet during this contest window.</p>}
            {leaderboard?.map((u, i) => (
              <div
                key={u.id}
                className="flex items-center gap-4 px-5 py-3.5"
                style={{ borderBottom: i < leaderboard.length - 1 ? "1px solid #1E1E2B" : "none" }}
              >
                <div className="w-7 text-center">
                  {u.rank <= 3 ? <Crown size={16} className={["text-warn", "text-slate-300", "text-amber-700"][u.rank - 1]} /> : <span className="text-sm font-mono text-muted">{u.rank}</span>}
                </div>
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold bg-gradient-to-br from-violet to-cyan text-void font-display">
                  {u.name?.[0]?.toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text truncate">{u.name}</p>
                  <p className="text-[11px] text-muted">{u.solves} solve{u.solves !== 1 ? "s" : ""}</p>
                </div>
                <p className="text-sm font-mono text-text">{u.contest_xp} XP</p>
              </div>
            ))}
          </GlassCard>
        )}
      </div>
    </Layout>
  );
}

import React, { useEffect, useState } from "react";
import { Crown, Flame } from "lucide-react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { titleForXp } from "../utils/gamification";
import Layout from "../components/Layout";
import GlassCard from "../components/GlassCard";

export default function Leaderboard() {
  const { user } = useAuth();
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    api.get("/leaderboard").then(({ data }) => setLeaderboard(data.leaderboard));
  }, []);

  return (
    <Layout>
      <div className="p-6 max-w-3xl mx-auto">
        <h1 className="font-display text-2xl font-semibold text-text mb-1">Leaderboard</h1>
        <p className="text-sm text-muted mb-6">Global rankings by total XP.</p>

        <GlassCard className="overflow-hidden">
          {leaderboard.map((u, i) => (
            <div
              key={u.id}
              className="flex items-center gap-4 px-5 py-3.5"
              style={{
                borderBottom: i < leaderboard.length - 1 ? "1px solid #1E1E2B" : "none",
                background: user && u.id === user.id ? "rgba(124,111,255,0.08)" : "transparent",
              }}
            >
              <div className="w-7 text-center">
                {u.rank <= 3 ? (
                  <Crown size={16} className={["text-warn", "text-slate-300", "text-amber-700"][u.rank - 1]} />
                ) : (
                  <span className="text-sm font-mono text-muted">{u.rank}</span>
                )}
              </div>
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold bg-gradient-to-br from-violet to-cyan text-void font-display">
                {u.name?.[0]?.toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text truncate">
                  {u.name}{user && u.id === user.id ? " (you)" : ""}
                </p>
                <p className="text-[11px] text-muted">{titleForXp(u.xp)}</p>
              </div>
              <span className="flex items-center gap-1 text-xs font-mono text-warn">
                <Flame size={12} /> {u.streak}
              </span>
              <p className="text-sm font-mono text-text w-20 text-right">{u.xp.toLocaleString()} XP</p>
            </div>
          ))}
        </GlassCard>
      </div>
    </Layout>
  );
}

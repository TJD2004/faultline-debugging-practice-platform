import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, Flame, Star, Coins, CheckCircle2, Zap } from "lucide-react";
import api from "../api/axios";
import Layout from "../components/Layout";
import GlassCard from "../components/GlassCard";

function timeUntilMidnight() {
  const now = new Date();
  const midnight = new Date(now);
  midnight.setHours(24, 0, 0, 0);
  const diffMs = midnight - now;
  const h = Math.floor(diffMs / 3600000);
  const m = Math.floor((diffMs % 3600000) / 60000);
  return `${h}h ${m}m`;
}

export default function DailyChallenge() {
  const [daily, setDaily] = useState(undefined); // undefined = loading, null = none today
  const [countdown, setCountdown] = useState(timeUntilMidnight());

  useEffect(() => {
    api.get("/daily/today").then(({ data }) => setDaily(data.daily));
    const timer = setInterval(() => setCountdown(timeUntilMidnight()), 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Layout>
      <div className="p-6 max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-2">
          <Calendar size={22} className="text-violet" />
          <h1 className="font-display text-2xl font-semibold text-text">Daily Challenge</h1>
        </div>
        <p className="text-sm text-muted mb-6">One fresh bug every 24 hours, with bonus XP for solving it today.</p>

        {daily === undefined && <p className="text-sm text-muted">Loading…</p>}

        {daily === null && (
          <GlassCard className="p-10 text-center">
            <p className="text-sm text-muted">No daily challenge is scheduled for today yet — check back soon.</p>
          </GlassCard>
        )}

        {daily && (
          <GlassCard className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="px-2 py-0.5 rounded-full text-xs font-mono border border-violet/40 text-violet bg-violet/10">
                {daily.lang}
              </span>
              <span className="flex items-center gap-1 text-xs font-mono text-warn">
                <Flame size={13} /> Resets in {countdown}
              </span>
            </div>

            <h2 className="font-display text-xl font-semibold text-text mb-2">{daily.title}</h2>

            <div className="flex items-center gap-4 text-xs font-mono text-muted mb-6">
              <span className="flex items-center gap-1"><Star size={12} className="text-warn" /> {daily.xp} XP base</span>
              <span className="flex items-center gap-1"><Coins size={12} className="text-warn" /> {daily.coins} coins base</span>
              <span className="flex items-center gap-1 text-success">
                <Zap size={12} /> {Number(daily.bonus_multiplier)}× bonus today
              </span>
            </div>

            {daily.completedToday ? (
              <div className="flex items-center gap-2 text-success text-sm">
                <CheckCircle2 size={16} /> Already solved today — nice work. Come back tomorrow for the next one.
              </div>
            ) : (
              <Link
                to={`/challenge/${daily.slug}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium bg-gradient-to-r from-violet to-[#6656e0] text-white"
              >
                <Zap size={15} /> Solve today's challenge
              </Link>
            )}
          </GlassCard>
        )}
      </div>
    </Layout>
  );
}

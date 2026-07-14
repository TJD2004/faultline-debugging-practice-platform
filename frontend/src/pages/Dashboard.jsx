import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Bug, ChevronRight, Coins, Flame, Play, CheckCircle2, Star } from "lucide-react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { titleForXp } from "../utils/gamification";
import Layout from "../components/Layout";
import GlassCard from "../components/GlassCard";
import XPBar from "../components/XPBar";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.4, ease: "easeOut" } }),
};

export default function Dashboard() {
  const { user } = useAuth();
  const [challenges, setChallenges] = useState([]);
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    api.get("/challenges").then(({ data }) => setChallenges(data.challenges));
    api.get("/submissions").then(({ data }) => setSubmissions(data.submissions));
  }, []);

  const streakDays = ["M", "T", "W", "T", "F", "S", "S"];
  const filledToday = Math.min(user?.streak ?? 0, 7);
  const solvedSet = new Set(submissions.map((s) => s.slug));

  return (
    <Layout>
      <div className="p-4 sm:p-6 max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-6 flex-wrap gap-4">
          <div>
            <h1 className="font-display text-2xl font-semibold text-text">Welcome back, {user?.name}</h1>
            <p className="text-sm mt-1 text-muted">{titleForXp(user?.xp)} · {user?.streak ?? 0} day streak</p>
          </div>
          <Link
            to="/practice"
            className="px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 bg-gradient-to-r from-violet to-[#6656e0] text-white"
          >
            <Play size={14} /> Resume practice
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0} className="lg:col-span-2">
          <GlassCard className="p-5">
            <XPBar xp={user?.xp ?? 0} />
            <div className="grid grid-cols-3 gap-3 mt-5">
              <div className="rounded-xl p-3 bg-surface2">
                <Bug size={16} className="text-violet" />
                <p className="text-lg font-display font-semibold mt-2 text-text">{submissions.length}</p>
                <p className="text-[11px] text-muted">Bugs Fixed</p>
              </div>
              <div className="rounded-xl p-3 bg-surface2">
                <CheckCircle2 size={16} className="text-success" />
                <p className="text-lg font-display font-semibold mt-2 text-text">
                  {submissions.length > 0 ? Math.round((submissions.filter((s) => !s.used_solution).length / submissions.length) * 100) : 0}%
                </p>
                <p className="text-[11px] text-muted">Clean solve rate</p>
              </div>
              <div className="rounded-xl p-3 bg-surface2">
                <Coins size={16} className="text-warn" />
                <p className="text-lg font-display font-semibold mt-2 text-text">{user?.coins ?? 0}</p>
                <p className="text-[11px] text-muted">Coins</p>
              </div>
            </div>
          </GlassCard>
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={1}>
          <GlassCard className="p-5">
            <div className="flex items-center gap-2 mb-3">
              <Flame size={18} className="text-warn" />
              <p className="text-sm font-medium text-text">Daily streak</p>
            </div>
            <div className="flex gap-1.5">
              {streakDays.map((d, i) => (
                <motion.div
                  key={i}
                  initial={{ scaleY: 0.3, opacity: 0 }}
                  animate={{ scaleY: 1, opacity: 1 }}
                  transition={{ delay: 0.3 + i * 0.05, type: "spring", stiffness: 200 }}
                  className="flex-1 h-9 rounded-md flex items-center justify-center text-[10px] font-mono"
                  style={{
                    background: i < filledToday ? "linear-gradient(180deg,#FBBF24,#f59e0b)" : "#1F1F2C",
                    color: i < filledToday ? "#0A0A0F" : "#8B8BA3",
                  }}
                >
                  {d}
                </motion.div>
              ))}
            </div>
            <p className="text-xs mt-3 text-muted">Fix one more bug today to keep it going.</p>
          </GlassCard>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={2} className="lg:col-span-2">
          <GlassCard className="p-5">
            <p className="text-sm font-medium mb-4 text-text">Recommended for you</p>
            <div className="space-y-2">
              {[...challenges]
                .sort((a, b) => solvedSet.has(a.slug) - solvedSet.has(b.slug))
                .slice(0, 4)
                .map((c, i) => (
                <motion.div key={c.slug} whileHover={{ x: 4 }} transition={{ type: "spring", stiffness: 400, damping: 25 }}>
                <Link
                  to={`/challenge/${c.slug}`}
                  className="w-full flex items-center gap-3 p-3 rounded-xl text-left hover:brightness-110 bg-surface2 border border-[#1F1F2C]"
                >
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 bg-violet/10">
                    {solvedSet.has(c.slug) ? <CheckCircle2 size={16} className="text-success" /> : <Bug size={16} className="text-violet" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm truncate text-text">{c.title}</p>
                    <div className="flex gap-1.5 mt-1">
                      <span className="px-2 py-0.5 rounded-full text-xs font-mono border border-violet/40 text-violet bg-violet/10">
                        {c.lang}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-xs font-mono border border-border text-muted">
                        {c.difficulty}
                      </span>
                      <span className="text-xs font-mono text-warn flex items-center gap-1">
                        <Star size={11} /> {c.xp}
                      </span>
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-muted" />
                </Link>
                </motion.div>
              ))}
            </div>
          </GlassCard>
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={3}>
          <GlassCard className="p-5">
            <p className="text-sm font-medium mb-4 text-text">Recent activity</p>
            <div className="space-y-4">
              {submissions.length === 0 && <p className="text-xs text-muted">No submissions yet — go fix something.</p>}
              {submissions.slice(0, 5).map((s) => (
                <div key={s.id} className="flex items-start gap-2.5">
                  <CheckCircle2 size={15} className="text-success mt-0.5 shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs text-[#B8B8CC]">Fixed "{s.title}"</p>
                    <p className="text-[11px] mt-0.5 text-slate-500">{new Date(s.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}

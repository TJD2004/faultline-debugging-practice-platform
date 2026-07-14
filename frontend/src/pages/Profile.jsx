import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Flame, Coins, Bug, Award, Calendar, Trophy, ChevronRight } from "lucide-react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { titleForXp } from "../utils/gamification";
import Layout from "../components/Layout";
import GlassCard from "../components/GlassCard";
import XPBar from "../components/XPBar";

export default function Profile() {
  const { user } = useAuth();
  const [submissions, setSubmissions] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [contestRank, setContestRank] = useState(null);

  useEffect(() => {
    api.get("/submissions").then(({ data }) => setSubmissions(data.submissions));
    api.get("/achievements").then(({ data }) => setAchievements(data.achievements));
    api.get("/contests/ranking/me").then(({ data }) => setContestRank(data));
  }, []);

  const languagesSolved = new Set(submissions.map((s) => s.lang)).size;
  const hardSolves = submissions.filter((s) => s.difficulty === "Hard").length;
  const unlockedAchievements = achievements.filter((a) => a.unlocked);

  return (
    <Layout>
      <div className="p-6 max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-semibold bg-gradient-to-br from-violet to-cyan text-void font-display shrink-0">
            {user?.name?.[0]?.toUpperCase() || "?"}
          </div>
          <div>
            <h1 className="font-display text-2xl font-semibold text-text">{user?.name}</h1>
            <p className="text-sm text-muted">{user?.email}</p>
            <p className="text-xs text-violet mt-1">{titleForXp(user?.xp)}</p>
          </div>
        </div>

        <GlassCard className="p-5 mb-4">
          <XPBar xp={user?.xp ?? 0} />
        </GlassCard>

        {/* Compact summary row: streak, achievements, contest rank — each a
            short glanceable widget linking to its full page. */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
          <SummaryWidget
            icon={Flame}
            color="#FBBF24"
            label="Streak"
            value={`${user?.streak ?? 0} day${user?.streak === 1 ? "" : "s"}`}
          />
          <Link to="/achievements">
            <SummaryWidget
              icon={Award}
              color="#34D399"
              label="Achievements"
              value={`${unlockedAchievements.length} / ${achievements.length || 0} unlocked`}
              linkable
            />
          </Link>
          <Link to="/contest/ranking">
            <SummaryWidget
              icon={Trophy}
              color="#7C6FFF"
              label="Contest rank"
              value={contestRank?.globalRank ? `#${contestRank.globalRank}` : "Unranked"}
              linkable
            />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <StatCard icon={Bug} color="#7C6FFF" value={submissions.length} label="Bugs fixed" />
          <StatCard icon={Coins} color="#FBBF24" value={user?.coins ?? 0} label="Coins" />
          <StatCard icon={Trophy} color="#7C6FFF" value={contestRank?.contestsParticipated ?? 0} label="Contests entered" />
          <StatCard icon={Award} color="#34D399" value={languagesSolved} label="Languages solved" />
        </div>

        <p className="text-sm font-medium text-text mb-3">Recent submissions</p>
        <GlassCard className="overflow-hidden">
          {submissions.length === 0 && <p className="p-5 text-xs text-muted">No submissions yet.</p>}
          {submissions.slice(0, 6).map((s, i) => (
            <div
              key={s.id}
              className="flex items-center gap-3 px-4 py-3"
              style={{ borderBottom: i < Math.min(submissions.length, 6) - 1 ? "1px solid #1E1E2B" : "none" }}
            >
              <Calendar size={14} className="text-slate-500 shrink-0" />
              <p className="text-xs text-[#B8B8CC] flex-1 truncate">{s.title}</p>
              <p className="text-[11px] text-slate-500">{new Date(s.created_at).toLocaleDateString()}</p>
            </div>
          ))}
        </GlassCard>
      </div>
    </Layout>
  );
}

function SummaryWidget({ icon: Icon, color, label, value, linkable }) {
  return (
    <GlassCard className="p-4 flex items-center gap-3 hover:brightness-110">
      <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${color}1a` }}>
        <Icon size={16} color={color} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[11px] text-muted">{label}</p>
        <p className="text-sm font-semibold text-text truncate">{value}</p>
      </div>
      {linkable && <ChevronRight size={14} className="text-muted shrink-0" />}
    </GlassCard>
  );
}

function StatCard({ icon: Icon, color, value, label }) {
  return (
    <GlassCard className="p-4">
      <Icon size={16} color={color} />
      <p className="text-lg font-display font-semibold mt-2 text-text">{value}</p>
      <p className="text-[11px] text-muted">{label}</p>
    </GlassCard>
  );
}

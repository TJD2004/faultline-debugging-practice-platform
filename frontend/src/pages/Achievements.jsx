import React, { useEffect, useState } from "react";
import {
  Award, Bug, Wrench, Search, Languages, Stethoscope, Flame, Calendar, Crown, Lock, CheckCircle2,
} from "lucide-react";
import api from "../api/axios";
import Layout from "../components/Layout";
import GlassCard from "../components/GlassCard";

// Maps the `icon` string stored in the achievements table to a lucide icon.
// Falls back to Award for any icon name not listed here — so adding a new
// achievement via SQL with an unrecognized icon still renders fine.
const ICONS = {
  bug: Bug, wrench: Wrench, search: Search, languages: Languages,
  stethoscope: Stethoscope, flame: Flame, calendar: Calendar, crown: Crown,
};

export default function Achievements() {
  const [achievements, setAchievements] = useState(null);

  useEffect(() => {
    api.get("/achievements").then(({ data }) => setAchievements(data.achievements));
  }, []);

  return (
    <Layout>
      <div className="p-6 max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-2">
          <Award size={22} className="text-violet" />
          <h1 className="font-display text-2xl font-semibold text-text">Achievements</h1>
        </div>
        <p className="text-sm text-muted mb-6">
          {achievements ? `${achievements.filter((a) => a.unlocked).length} of ${achievements.length} unlocked` : "Loading…"}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements?.map((a) => {
            const Icon = ICONS[a.icon] || Award;
            const pct = Math.round((a.progress / a.threshold) * 100);
            return (
              <GlassCard
                key={a.slug}
                className="p-5"
                style={{ opacity: a.unlocked ? 1 : 0.55, borderColor: a.unlocked ? "#34D39955" : undefined }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: a.unlocked ? "linear-gradient(135deg,#7C6FFF,#4FD1E8)" : "#1F1F2C" }}
                  >
                    <Icon size={18} className={a.unlocked ? "text-void" : "text-muted"} />
                  </div>
                  {a.unlocked ? (
                    <CheckCircle2 size={16} className="text-success" />
                  ) : (
                    <Lock size={14} className="text-slate-600" />
                  )}
                </div>
                <p className="text-sm font-semibold text-text mb-1">{a.title}</p>
                <p className="text-xs text-muted mb-3">{a.description}</p>
                <div className="h-1.5 rounded-full overflow-hidden bg-[#1F1F2C]">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-violet to-cyan transition-all duration-700"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <p className="text-[11px] text-slate-500 mt-1.5 font-mono">{a.progress} / {a.threshold}</p>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}

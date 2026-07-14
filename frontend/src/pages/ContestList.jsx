import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swords, Clock, Trophy, Timer } from "lucide-react";
import api from "../api/axios";
import Layout from "../components/Layout";
import GlassCard from "../components/GlassCard";

const STATUS_STYLE = {
  active: { color: "#34D399", label: "Active now" },
  upcoming: { color: "#FBBF24", label: "Upcoming" },
  ended: { color: "#8B8BA3", label: "Ended" },
};

function useCountdown(targetIso) {
  const [label, setLabel] = useState("");
  useEffect(() => {
    if (!targetIso) return;
    const tick = () => {
      const diff = new Date(targetIso) - new Date();
      if (diff <= 0) {
        setLabel("starting now");
        return;
      }
      const days = Math.floor(diff / 86400000);
      const hours = Math.floor((diff % 86400000) / 3600000);
      const mins = Math.floor((diff % 3600000) / 60000);
      setLabel(days > 0 ? `${days}d ${hours}h ${mins}m` : `${hours}h ${mins}m`);
    };
    tick();
    const timer = setInterval(tick, 30000);
    return () => clearInterval(timer);
  }, [targetIso]);
  return label;
}

function ContestCard({ c }) {
  const style = STATUS_STYLE[c.status] || STATUS_STYLE.ended;
  return (
    <Link to={`/contest/${c.slug}`}>
      <GlassCard className="p-5 hover:brightness-110">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-display text-lg font-semibold text-text">{c.title}</h3>
          <span
            className="px-2.5 py-0.5 rounded-full text-xs font-mono"
            style={{ color: style.color, background: `${style.color}1a`, border: `1px solid ${style.color}40` }}
          >
            {style.label}
          </span>
        </div>
        <p className="text-sm text-muted mb-3">{c.description}</p>
        <div className="flex items-center gap-1.5 text-xs font-mono text-slate-500">
          <Clock size={12} />
          {new Date(c.start_time).toLocaleString()} → {new Date(c.end_time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </div>
      </GlassCard>
    </Link>
  );
}

export default function ContestList() {
  const [contests, setContests] = useState(null);
  const [next, setNext] = useState(undefined); // undefined = loading, null = none
  const countdown = useCountdown(next?.status === "upcoming" ? next.start_time : null);

  useEffect(() => {
    api.get("/contests").then(({ data }) => setContests(data.contests));
    api.get("/contests/next").then(({ data }) => setNext(data.contest));
  }, []);

  const upcoming = contests?.filter((c) => c.status === "upcoming") || [];
  const active = contests?.filter((c) => c.status === "active") || [];
  const past = contests?.filter((c) => c.status === "ended") || [];

  return (
    <Layout>
      <div className="p-6 max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <Swords size={22} className="text-violet" />
            <h1 className="font-display text-2xl font-semibold text-text">Contest</h1>
          </div>
          <Link
            to="/contest/ranking"
            className="flex items-center gap-1.5 text-xs font-medium text-violet border border-violet/30 bg-violet/10 rounded-lg px-3 py-1.5"
          >
            <Trophy size={13} /> Global ranking
          </Link>
        </div>
        <p className="text-sm text-muted mb-6">
          8 challenges, 1 hour, every Saturday at 7:00 PM. Timed head-to-head debugging against the clock.
        </p>

        {next && next.status === "upcoming" && (
          <GlassCard className="p-5 mb-6" style={{ borderColor: "#7C6FFF55" }}>
            <div className="flex items-center gap-2 mb-1">
              <Timer size={16} className="text-violet" />
              <p className="text-sm font-medium text-text">Next contest: {next.title}</p>
            </div>
            <p className="text-xs text-muted mb-2">{new Date(next.start_time).toLocaleString()}</p>
            <p className="font-display text-2xl font-semibold text-violet">{countdown}</p>
          </GlassCard>
        )}

        {contests === null && <p className="text-sm text-muted">Loading…</p>}
        {contests?.length === 0 && (
          <GlassCard className="p-10 text-center">
            <p className="text-sm text-muted">No contests scheduled right now — check back soon.</p>
          </GlassCard>
        )}

        {active.length > 0 && (
          <div className="mb-6">
            <p className="text-xs font-mono uppercase text-slate-500 mb-2">Active now</p>
            <div className="space-y-3">{active.map((c) => <ContestCard key={c.slug} c={c} />)}</div>
          </div>
        )}

        {upcoming.length > 0 && (
          <div className="mb-6">
            <p className="text-xs font-mono uppercase text-slate-500 mb-2">Upcoming</p>
            <div className="space-y-3">{upcoming.map((c) => <ContestCard key={c.slug} c={c} />)}</div>
          </div>
        )}

        {past.length > 0 && (
          <div>
            <p className="text-xs font-mono uppercase text-slate-500 mb-2">Previous contests</p>
            <div className="space-y-3">{past.map((c) => <ContestCard key={c.slug} c={c} />)}</div>
          </div>
        )}
      </div>
    </Layout>
  );
}

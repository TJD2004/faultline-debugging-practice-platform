import React, { useEffect, useState } from "react";
import { CheckCircle2, Send } from "lucide-react";
import api from "../api/axios";
import Layout from "../components/Layout";
import GlassCard from "../components/GlassCard";
import Pill from "../components/Pill";

export default function Submissions() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/submissions").then(({ data }) => {
      setSubmissions(data.submissions);
      setLoading(false);
    });
  }, []);

  return (
    <Layout>
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="font-display text-2xl font-semibold text-text mb-1">Submissions</h1>
        <p className="text-sm text-muted mb-6">
          {loading ? "Loading…" : `${submissions.length} submission${submissions.length !== 1 ? "s" : ""} · most recent first.`}
        </p>

        {!loading && submissions.length === 0 && (
          <GlassCard className="p-10 text-center">
            <Send size={20} className="text-slate-600 mx-auto mb-3" />
            <p className="text-sm text-muted">No submissions yet. Solve a challenge in Practice and submit it.</p>
          </GlassCard>
        )}

        {submissions.length > 0 && (
          <GlassCard className="overflow-hidden">
            {submissions.map((s, i) => (
              <div
                key={s.id}
                className="flex items-center gap-4 px-5 py-3.5"
                style={{ borderBottom: i < submissions.length - 1 ? "1px solid #1E1E2B" : "none" }}
              >
                <CheckCircle2 size={16} className="text-success shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text truncate">{s.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Pill color="#4FD1E8">{s.lang}</Pill>
                    {!!s.used_solution && <Pill color="#FBBF24">Solution used</Pill>}
                    <span className="text-[11px] font-mono text-slate-500">{s.attempts} attempt{s.attempts !== 1 ? "s" : ""}</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs font-mono text-violet">+{s.xp_earned} XP</p>
                  <p className="text-[11px] text-slate-500">{new Date(s.created_at).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </GlassCard>
        )}
      </div>
    </Layout>
  );
}

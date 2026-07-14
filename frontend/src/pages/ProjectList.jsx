import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FolderGit2, Star, Coins, ChevronRight } from "lucide-react";
import api from "../api/axios";
import Layout from "../components/Layout";
import GlassCard from "../components/GlassCard";
import Pill from "../components/Pill";

export default function ProjectList() {
  const [projects, setProjects] = useState(null);

  useEffect(() => {
    api.get("/projects").then(({ data }) => setProjects(data.projects));
  }, []);

  return (
    <Layout>
      <div className="p-6 max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-2">
          <FolderGit2 size={22} className="text-violet" />
          <h1 className="font-display text-2xl font-semibold text-text">Project Mode</h1>
        </div>
        <p className="text-sm text-muted mb-6">Navigate a full multi-file project and fix a real, reported bug.</p>

        {projects === null && <p className="text-sm text-muted">Loading…</p>}
        {projects?.length === 0 && (
          <GlassCard className="p-10 text-center">
            <p className="text-sm text-muted">No projects available yet.</p>
          </GlassCard>
        )}

        <div className="space-y-3">
          {projects?.map((p) => (
            <Link key={p.slug} to={`/projects/${p.slug}`}>
              <GlassCard className="p-5 flex items-center gap-4 hover:brightness-110">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-violet/10 shrink-0">
                  <FolderGit2 size={18} className="text-violet" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text truncate">{p.title}</p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <Pill color="#4FD1E8">{p.lang}</Pill>
                    <Pill color="#8B8BA3">{p.difficulty}</Pill>
                    <span className="text-xs font-mono text-warn flex items-center gap-1"><Star size={11} /> {p.xp}</span>
                    <span className="text-xs font-mono text-warn flex items-center gap-1"><Coins size={11} /> {p.coins}</span>
                  </div>
                </div>
                <ChevronRight size={16} className="text-muted shrink-0" />
              </GlassCard>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}

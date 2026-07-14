import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Play, Send, RotateCcw, Lightbulb, CheckCircle2, AlertTriangle, Trophy, File as FileIcon,
} from "lucide-react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { useSettings } from "../context/SettingsContext";
import Layout from "../components/Layout";
import GlassCard from "../components/GlassCard";
import Pill from "../components/Pill";

export default function ProjectDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const { settings, editorFontFamilyCss } = useSettings();

  const [project, setProject] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [filesState, setFilesState] = useState({});
  const [activeFile, setActiveFile] = useState(null);
  const [errors, setErrors] = useState([]);
  const [status, setStatus] = useState("idle");
  const [attempts, setAttempts] = useState(0);
  const [tab, setTab] = useState("report");
  const [reward, setReward] = useState(null);
  const [loading, setLoading] = useState(true);
  const [revealedFiles, setRevealedFiles] = useState({});
  const [usedSolution, setUsedSolution] = useState(false);
  const [confirmRevealFile, setConfirmRevealFile] = useState(null);

  useEffect(() => {
    setLoading(true);
    api.get(`/projects/${slug}`).then(({ data }) => {
      setProject(data.project);
      setFileList(data.files);
      const initial = {};
      data.files.forEach((f) => (initial[f.file_path] = f.buggy_content));
      setFilesState(initial);
      setActiveFile(data.files.find((f) => f.is_entry_point)?.file_path || data.files[0]?.file_path);
      setLoading(false);
    });
    setErrors([]);
    setStatus("idle");
    setAttempts(0);
    setReward(null);
    setUsedSolution(false);
    setRevealedFiles({});
  }, [slug]);

  const runProject = async () => {
    const { data } = await api.post(`/projects/${slug}/run`, { files: filesState });
    setAttempts((a) => a + 1);
    if (data.success) {
      setStatus("pass");
      setErrors([]);
    } else {
      setStatus("fail");
      setErrors(data.errors);
    }
  };

  const resetProject = () => {
    const initial = {};
    fileList.forEach((f) => (initial[f.file_path] = f.buggy_content));
    setFilesState(initial);
    setErrors([]);
    setStatus("idle");
  };

  const revealFile = async (filePath) => {
    const { data } = await api.get(`/projects/${slug}/solution/${filePath}`);
    setRevealedFiles((prev) => ({ ...prev, [filePath]: data.solution }));
    setFilesState((prev) => ({ ...prev, [filePath]: data.solution }));
    setUsedSolution(true);
    setConfirmRevealFile(null);
  };

  const submit = async () => {
    const { data } = await api.post(`/projects/${slug}/submit`, { files: filesState, attempts, usedSolution });
    setReward(data);
    setUser((prev) => (prev ? { ...prev, xp: prev.xp + data.xpEarned, coins: prev.coins + data.coinsEarned } : prev));
  };

  if (loading || !project) {
    return (
      <Layout>
        <p className="p-6 text-sm text-muted">Loading project…</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-6xl mx-auto p-4 sm:p-6">
        <button
          onClick={() => {
            if (window.history.state && window.history.state.idx > 0) {
              navigate(-1);
            } else {
              navigate("/projects");
            }
          }}
          className="text-xs text-muted mb-4"
        >
          ← Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-5">
          {/* LEFT: problem panel + file tree */}
          <div className="space-y-4">
            <GlassCard className="p-5">
              <div className="flex items-center gap-2 mb-3">
                <Pill color="#4FD1E8">{project.lang}</Pill>
                <Pill color="#8B8BA3">{project.difficulty}</Pill>
              </div>
              <h2 className="font-display text-lg font-semibold text-text mb-4">{project.title}</h2>

              <div className="flex gap-1 mb-4 p-1 rounded-lg bg-surface2">
                {["report", "hints", "objective"].map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={`flex-1 py-1.5 rounded-md text-xs font-medium capitalize ${tab === t ? "bg-border text-text" : "text-muted"}`}
                  >
                    {t === "report" ? "Bug Report" : t}
                  </button>
                ))}
              </div>

              {tab === "report" && <p className="text-xs leading-relaxed text-muted">{project.bugReport}</p>}
              {tab === "hints" && (
                <div className="space-y-2">
                  {project.hints.map((h, i) => (
                    <div key={i} className="flex items-start gap-2 p-2.5 rounded-lg bg-surface2">
                      <Lightbulb size={13} className="text-warn mt-0.5 shrink-0" />
                      <p className="text-xs text-muted">{h}</p>
                    </div>
                  ))}
                </div>
              )}
              {tab === "objective" && <p className="text-xs leading-relaxed text-muted">{project.objective}</p>}
            </GlassCard>

            <GlassCard className="p-3">
              <p className="text-[11px] font-mono uppercase text-slate-500 px-2 mb-2">Files</p>
              <div className="space-y-0.5">
                {fileList.map((f) => (
                  <button
                    key={f.file_path}
                    onClick={() => setActiveFile(f.file_path)}
                    className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-left text-xs font-mono"
                    style={{
                      background: activeFile === f.file_path ? "#262635" : "transparent",
                      color: activeFile === f.file_path ? "#E7E7EF" : "#8B8BA3",
                    }}
                  >
                    <FileIcon size={13} className="shrink-0" />
                    <span className="truncate">{f.file_path}</span>
                    {revealedFiles[f.file_path] && <span className="ml-auto text-[10px] text-warn shrink-0">solved</span>}
                  </button>
                ))}
              </div>
            </GlassCard>
          </div>

          {/* RIGHT: editor + terminal */}
          <div className="space-y-4">
            <div className="rounded-xl overflow-hidden border border-border">
              <div className="flex items-center justify-between px-3 py-2 bg-surface2 border-b border-border">
                <span className="text-xs font-mono text-muted">{activeFile}</span>
                {!revealedFiles[activeFile] && (
                  confirmRevealFile === activeFile ? (
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-text">Reveal this file? Reduces reward to 30%.</span>
                      <button onClick={() => revealFile(activeFile)} className="text-[11px] font-medium text-warn">Yes</button>
                      <button onClick={() => setConfirmRevealFile(null)} className="text-[11px] text-muted">Cancel</button>
                    </div>
                  ) : (
                    <button onClick={() => setConfirmRevealFile(activeFile)} className="text-[11px] text-warn flex items-center gap-1">
                      <Lightbulb size={11} /> Reveal solution
                    </button>
                  )
                )}
              </div>
              <textarea
                spellCheck={false}
                value={filesState[activeFile] || ""}
                onChange={(e) => setFilesState((prev) => ({ ...prev, [activeFile]: e.target.value }))}
                className="w-full bg-void text-[#D6D6E6] p-3 outline-none resize-none"
                style={{ minHeight: 320, lineHeight: 1.6, fontFamily: editorFontFamilyCss, fontSize: settings.editorFontSize }}
              />
            </div>

            <div className="flex flex-wrap gap-2 items-center">
              <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} onClick={runProject} className="px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 bg-gradient-to-r from-violet to-[#6656e0] text-white">
                <Play size={14} /> Run
              </motion.button>
              <motion.button
                whileHover={status === "pass" ? { scale: 1.04 } : {}}
                whileTap={status === "pass" ? { scale: 0.96 } : {}}
                disabled={status !== "pass"}
                onClick={submit}
                className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 ${status === "pass" ? "bg-gradient-to-r from-success to-[#22b384] text-void" : "bg-surface2 text-slate-600 cursor-not-allowed"}`}
              >
                <Send size={14} /> Submit
              </motion.button>
              <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} onClick={resetProject} className="px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 bg-surface2 border border-border text-text">
                <RotateCcw size={14} /> Reset
              </motion.button>
              <div className="ml-auto flex items-center gap-1.5 text-xs font-mono text-muted">
                {status === "pass" && <><CheckCircle2 size={14} className="text-success" /> All checks passed</>}
                {status === "fail" && <><AlertTriangle size={14} className="text-error" /> {attempts} attempt{attempts !== 1 ? "s" : ""}</>}
                {status === "idle" && "Not run yet"}
              </div>
            </div>

            <div className="rounded-xl overflow-hidden border border-border">
              <div className="px-3 py-2 bg-surface2 text-xs font-mono text-muted border-b border-border">output — across all files</div>
              <div className="p-3 font-mono text-[12.5px] leading-relaxed h-40 overflow-y-auto bg-void">
                {errors.length === 0 && status !== "pass" && <p className="text-slate-600">Press Run to check every file…</p>}
                {status === "pass" && <p className="text-success">✓ All checks passed across every file</p>}
                {errors.map((e, i) => (
                  <p key={i} className="text-error whitespace-pre-wrap">
                    {e.file ? `[${e.file}] ` : ""}{e.msg}
                  </p>
                ))}
              </div>
            </div>

            {reward && (
              <GlassCard className="p-5" style={{ borderColor: "#34D39955" }}>
                <div className="flex items-center gap-2 mb-1">
                  <Trophy size={18} className="text-warn" />
                  <p className="text-sm font-semibold text-text">Project fixed 🎉</p>
                </div>
                {usedSolution && <p className="text-[11px] mb-3 text-warn">A solution was revealed — rewards reduced to 30%.</p>}
                <div className="grid grid-cols-2 gap-3 text-center mt-3">
                  <div><p className="text-lg font-display font-semibold text-violet">+{reward.xpEarned}</p><p className="text-[11px] text-muted">XP</p></div>
                  <div><p className="text-lg font-display font-semibold text-warn">+{reward.coinsEarned}</p><p className="text-[11px] text-muted">Coins</p></div>
                </div>
              </GlassCard>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

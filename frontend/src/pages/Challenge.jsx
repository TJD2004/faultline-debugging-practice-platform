import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Send, RotateCcw, Lightbulb, CheckCircle2, AlertTriangle, Trophy, MessageSquareText, Code2, ChevronRight } from "lucide-react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { useSettings } from "../context/SettingsContext";
import Layout from "../components/Layout";
import GlassCard from "../components/GlassCard";
import Pill from "../components/Pill";
import TerminalPanel from "../components/TerminalPanel";
import AiMentor from "../components/AiMentor";

function draftKey(slug) {
  return `faultline_draft_${slug}`;
}

export default function Challenge() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const { settings, editorFontFamilyCss } = useSettings();
  const saveTimer = useRef(null);

  const [challenge, setChallenge] = useState(null);
  const [code, setCode] = useState("");
  const [lines, setLines] = useState([]);
  const [status, setStatus] = useState("idle"); // idle | fail | pass
  const [errorLines, setErrorLines] = useState([]);
  const [attempts, setAttempts] = useState(0);
  const [tab, setTab] = useState("report");
  const [showMentor, setShowMentor] = useState(false);
  const [solution, setSolution] = useState(null);
  const [solutionRevealed, setSolutionRevealed] = useState(false);
  const [confirmingReveal, setConfirmingReveal] = useState(false);
  const [reward, setReward] = useState(null);
  const [loading, setLoading] = useState(true);
  const [nextChallengeSlug, setNextChallengeSlug] = useState(null);
  const [draftRestored, setDraftRestored] = useState(false);

  useEffect(() => {
    setLoading(true);
    api.get(`/challenges/${slug}`).then(({ data }) => {
      setChallenge(data.challenge);
      const draft = settings.autoSave ? localStorage.getItem(draftKey(slug)) : null;
      if (draft) {
        setCode(draft);
        setDraftRestored(true);
      } else {
        setCode(data.challenge.buggyCode);
        setDraftRestored(false);
      }
      setLoading(false);
    });
    api.get("/challenges").then(({ data }) => {
      const idx = data.challenges.findIndex((c) => c.slug === slug);
      const next = idx >= 0 ? data.challenges[(idx + 1) % data.challenges.length] : null;
      setNextChallengeSlug(next && next.slug !== slug ? next.slug : null);
    });
    setLines([]);
    setStatus("idle");
    setErrorLines([]);
    setAttempts(0);
    setSolution(null);
    setSolutionRevealed(false);
    setConfirmingReveal(false);
    setReward(null);
    setShowMentor(false);
    setTab("report");
  }, [slug]);

  // Debounced auto-save of the current draft, only while the setting is on.
  useEffect(() => {
    if (!settings.autoSave || !challenge) return;
    clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      localStorage.setItem(draftKey(slug), code);
    }, 600);
    return () => clearTimeout(saveTimer.current);
  }, [code, settings.autoSave, slug, challenge]);


  const runCode = async () => {
    const { data } = await api.post(`/challenges/${slug}/run`, { code });
    setAttempts((a) => a + 1);
    if (data.success) {
      setStatus("pass");
      setErrorLines([]);
      setLines([
        { text: `running ${challenge.fileName}...`, color: "#8B8BA3" },
        { text: "✓ Compiled successfully", color: "#34D399" },
        { text: "✓ Runtime completed with no errors", color: "#34D399" },
        { text: "✓ 3/3 hidden tests passed", color: "#34D399" },
      ]);
    } else {
      setStatus("fail");
      setErrorLines(data.errors.map((e) => e.line));
      setLines([
        { text: `running ${challenge.fileName}...`, color: "#8B8BA3" },
        ...data.errors.map((e) => ({ text: e.msg, color: "#F87171", noPrompt: true })),
        { text: "✗ 0/3 hidden tests passed", color: "#F87171" },
      ]);
    }
  };

  const resetCode = () => {
    setCode(challenge.buggyCode);
    setLines([]);
    setStatus("idle");
    setErrorLines([]);
    setDraftRestored(false);
    localStorage.removeItem(draftKey(slug));
  };

  const revealSolution = async () => {
    const { data } = await api.get(`/challenges/${slug}/solution`);
    setSolution(data.solution);
    setSolutionRevealed(true);
    setConfirmingReveal(false);
    setCode(data.solution);
    setTab("solution");
  };

  const submit = async () => {
    const { data } = await api.post(`/challenges/${slug}/submit`, {
      code,
      attempts,
      usedSolution: solutionRevealed,
    });
    setReward(data);
    localStorage.removeItem(draftKey(slug));
    // Reflect the new XP/coins immediately in the sidebar/topbar without a full reload.
    setUser((prev) =>
      prev ? { ...prev, xp: prev.xp + data.xpEarned, coins: prev.coins + data.coinsEarned } : prev
    );
  };

  if (loading || !challenge) {
    return (
      <Layout>
        <p className="text-muted text-sm p-6">Loading challenge…</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-6xl mx-auto p-4 sm:p-6">
        <button
          onClick={() => {
            // Go back to wherever the user actually came from (Practice with its
            // filters intact, Dashboard, Bookmarks, a Contest, etc.) when there's
            // real history to return to; otherwise fall back to Practice.
            if (window.history.state && window.history.state.idx > 0) {
              navigate(-1);
            } else {
              navigate("/practice");
            }
          }}
          className="flex items-center gap-1.5 text-xs mb-4 text-muted"
        >
          ← Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-5">
          {/* LEFT: problem panel */}
          <div className="space-y-4">
            <GlassCard className="p-5">
              <div className="flex items-center gap-2 mb-3">
                <Pill color="#4FD1E8">{challenge.lang}</Pill>
                <Pill color="#8B8BA3">{challenge.difficulty}</Pill>
              </div>
              <h2 className="font-display text-lg font-semibold text-text mb-4">{challenge.title}</h2>

              <div className="flex gap-1 mb-4 p-1 rounded-lg bg-surface2 overflow-x-auto">
                {["report", "hints", "objective", ...(challenge.schema ? ["schema"] : []), "solution"].map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={`flex-1 py-1.5 px-2 rounded-md text-xs font-medium whitespace-nowrap capitalize ${
                      tab === t ? "bg-border text-text" : "text-muted"
                    }`}
                  >
                    {t === "report" ? "Bug Report" : t}
                  </button>
                ))}
              </div>

              {tab === "report" && (
                <div>
                  <p className="text-xs leading-relaxed text-muted mb-3">{challenge.bugReport}</p>
                  <div className="p-3 rounded-lg bg-surface2">
                    <p className="text-[11px] font-mono uppercase text-slate-500 mb-1">Expected output</p>
                    <p className="text-xs font-mono text-success">{challenge.expectedOutput}</p>
                  </div>
                </div>
              )}
              {tab === "hints" && (
                <div className="space-y-2">
                  {challenge.hints.map((h, i) => (
                    <div key={i} className="flex items-start gap-2 p-2.5 rounded-lg bg-surface2">
                      <Lightbulb size={13} className="text-warn mt-0.5 shrink-0" />
                      <p className="text-xs text-muted">{h}</p>
                    </div>
                  ))}
                </div>
              )}
              {tab === "objective" && <p className="text-xs leading-relaxed text-muted">{challenge.objective}</p>}
              {tab === "schema" && challenge.schema && (
                <div className="space-y-3">
                  <p className="text-[11px] font-mono text-slate-500">{challenge.schema.dialect}</p>
                  {challenge.schema.tables.map((t) => (
                    <div key={t.name}>
                      <pre className="rounded-lg p-3 mb-2 font-mono text-[11px] whitespace-pre-wrap bg-void border border-border text-muted">
                        {t.create}
                      </pre>
                      <table className="w-full text-[11px] font-mono border border-border rounded-lg overflow-hidden">
                        <thead>
                          <tr className="bg-surface2">
                            {t.columns.map((c) => (
                              <th key={c} className="text-left px-2 py-1.5 text-violet">{c}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {t.rows.map((row, ri) => (
                            <tr key={ri} className="border-t border-border">
                              {row.map((cell, ci) => (
                                <td key={ci} className="px-2 py-1.5 text-muted">{cell}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ))}
                </div>
              )}
              {tab === "solution" && (
                <div>
                  {!solutionRevealed && !confirmingReveal && (
                    <div className="text-center py-4">
                      <Lightbulb size={20} className="text-warn mx-auto mb-2" />
                      <p className="text-xs text-muted mb-4">
                        Stuck? Reveal the full solution — this reduces the XP/coins for this challenge to 30%.
                      </p>
                      <button
                        onClick={() => setConfirmingReveal(true)}
                        className="px-4 py-2 rounded-lg text-xs font-medium bg-surface2 text-warn border border-warn/30"
                      >
                        Show solution
                      </button>
                    </div>
                  )}
                  {confirmingReveal && (
                    <div className="text-center py-4">
                      <p className="text-xs text-text mb-4">Reveal the solution and reduce this reward to 30%?</p>
                      <div className="flex gap-2 justify-center">
                        <button onClick={revealSolution} className="px-3 py-1.5 rounded-lg text-xs font-medium bg-warn text-void">
                          Yes, reveal it
                        </button>
                        <button onClick={() => setConfirmingReveal(false)} className="px-3 py-1.5 rounded-lg text-xs font-medium bg-surface2 text-muted border border-border">
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                  {solutionRevealed && solution && (
                    <pre className="rounded-lg p-3 text-[11.5px] font-mono overflow-x-auto bg-void border border-border text-muted">
                      {solution}
                    </pre>
                  )}
                </div>
              )}
            </GlassCard>

            <div className="flex gap-2">
              <button
                onClick={() => setShowMentor((s) => !s)}
                className="flex-1 py-2 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 bg-surface2 text-violet border border-border"
              >
                <MessageSquareText size={13} /> AI Debug Mentor
              </button>
              <button
                onClick={() => { setTab("hints"); setShowMentor(false); }}
                className="flex-1 py-2 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 bg-surface2 text-warn border border-border"
              >
                <Lightbulb size={13} /> Hint
              </button>
            </div>

            {showMentor && <AiMentor hints={challenge.hints} attempts={attempts} onClose={() => setShowMentor(false)} />}
          </div>

          {/* RIGHT: editor + terminal */}
          <div className="space-y-4">
            <div className="rounded-xl overflow-hidden border border-border">
              <div className="flex items-center gap-2 px-3 py-2 bg-surface2 border-b border-border">
                <Code2 size={13} className="text-muted" />
                <span className="text-xs font-mono text-muted">{challenge.fileName}</span>
                {draftRestored && (
                  <span className="ml-auto text-[10px] text-warn">draft restored</span>
                )}
              </div>
              <div className="flex bg-void">
                <div className="py-3 px-2 text-right select-none" style={{ color: "#3E3E52", fontFamily: editorFontFamilyCss, fontSize: settings.editorFontSize, lineHeight: 1.65 }}>
                  {code.split("\n").map((_, i) => (
                    <div key={i} style={{ background: errorLines.includes(i + 1) ? "rgba(248,113,113,0.12)" : "transparent" }}>
                      {i + 1}
                    </div>
                  ))}
                </div>
                <textarea
                  spellCheck={false}
                  value={code}
                  onChange={(e) => { setCode(e.target.value); setDraftRestored(false); }}
                  className="flex-1 bg-transparent outline-none resize-none py-3 pr-3 text-[#D6D6E6]"
                  style={{ fontFamily: editorFontFamilyCss, fontSize: settings.editorFontSize, lineHeight: 1.65, minHeight: 280 }}
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-2 items-center">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={runCode}
                className="px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 bg-gradient-to-r from-violet to-[#6656e0] text-white shadow-[0_6px_20px_-8px_rgba(124,111,255,0.6)]"
              >
                <Play size={14} /> Run
              </motion.button>
              <motion.button
                whileHover={status === "pass" ? { scale: 1.04 } : {}}
                whileTap={status === "pass" ? { scale: 0.96 } : {}}
                disabled={status !== "pass"}
                onClick={submit}
                className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 ${
                  status === "pass" ? "bg-gradient-to-r from-success to-[#22b384] text-void shadow-[0_6px_20px_-8px_rgba(52,211,153,0.6)]" : "bg-surface2 text-slate-600 cursor-not-allowed"
                }`}
              >
                <Send size={14} /> Submit
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={resetCode}
                className="px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 bg-surface2 border border-border text-text"
              >
                <RotateCcw size={14} /> Reset
              </motion.button>
              <div className="ml-auto flex items-center gap-1.5 text-xs font-mono text-muted">
                {status === "pass" && <><CheckCircle2 size={14} className="text-success" /> All checks passed</>}
                {status === "fail" && <><AlertTriangle size={14} className="text-error" /> {attempts} attempt{attempts !== 1 ? "s" : ""}</>}
                {status === "idle" && "Not run yet"}
              </div>
            </div>

            <TerminalPanel lines={lines} kind={challenge.terminalKind} />

            <AnimatePresence>
              {reward && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                >
                  <GlassCard className="p-5" style={{ borderColor: "#34D39955" }}>
                    <div className="flex items-center gap-2 mb-1">
                      <motion.div
                        initial={{ rotate: -20, scale: 0 }}
                        animate={{ rotate: 0, scale: 1 }}
                        transition={{ delay: 0.15, type: "spring", stiffness: 300 }}
                      >
                        <Trophy size={18} className="text-warn" />
                      </motion.div>
                      <p className="text-sm font-semibold text-text">Bug squashed 🎉</p>
                    </div>
                    {solutionRevealed && <p className="text-[11px] mb-3 text-warn">Solution was viewed — rewards reduced to 30%.</p>}
                    {reward.dailyBonusApplied && <p className="text-[11px] mb-3 text-success">⚡ Daily Challenge bonus applied!</p>}
                    <div className="grid grid-cols-2 gap-3 text-center mt-3">
                      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
                        <p className="text-lg font-display font-semibold text-violet">+{reward.xpEarned}</p>
                        <p className="text-[11px] text-muted">XP</p>
                      </motion.div>
                      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
                        <p className="text-lg font-display font-semibold text-warn">+{reward.coinsEarned}</p>
                        <p className="text-[11px] text-muted">Coins</p>
                      </motion.div>
                    </div>
                    {nextChallengeSlug && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}>
                        <Link
                          to={`/challenge/${nextChallengeSlug}`}
                          className="mt-4 w-full flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-sm font-medium bg-gradient-to-r from-violet to-[#6656e0] text-white"
                        >
                          Next Challenge <ChevronRight size={15} />
                        </Link>
                      </motion.div>
                    )}
                  </GlassCard>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </Layout>
  );
}

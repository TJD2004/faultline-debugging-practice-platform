import React from "react";
import { Terminal as TerminalIcon, Code2, AlertTriangle, Container, GitBranch, Database } from "lucide-react";

const TERMINAL_META = {
  "browser-console": { icon: Code2, label: "Browser Console", prompt: null },
  python: { icon: TerminalIcon, label: "python3", prompt: "$" },
  node: { icon: TerminalIcon, label: "node server.js", prompt: "$" },
  java: { icon: TerminalIcon, label: "javac + java", prompt: "$" },
  cpp: { icon: TerminalIcon, label: "gcc / g++", prompt: "$" },
  go: { icon: TerminalIcon, label: "go run", prompt: "$" },
  bash: { icon: TerminalIcon, label: "bash", prompt: "$" },
  php: { icon: TerminalIcon, label: "php", prompt: "$" },
  nextjs: { icon: AlertTriangle, label: "Next.js — Runtime Error overlay", prompt: null },
  docker: { icon: Container, label: "docker logs -f", prompt: "≡" },
  git: { icon: GitBranch, label: "git", prompt: "git" },
  sql: { icon: Database, label: "mysql", prompt: "mysql>" },
};

export default function TerminalPanel({ lines, kind = "node" }) {
  const meta = TERMINAL_META[kind] || TERMINAL_META.node;
  const Icon = meta.icon;
  const isOverlay = kind === "nextjs";

  return (
    <div className="rounded-xl overflow-hidden border" style={{ borderColor: isOverlay ? "#F8717155" : "#262635" }}>
      <div
        className="flex items-center gap-2 px-3 py-2 border-b"
        style={{ borderColor: "#262635", background: isOverlay ? "#2A1414" : "#191925" }}
      >
        <Icon size={13} color={isOverlay ? "#F87171" : "#8B8BA3"} />
        <span className="text-xs font-mono" style={{ color: isOverlay ? "#F87171" : "#8B8BA3" }}>{meta.label}</span>
      </div>
      <div
        className="p-3 font-mono text-[12.5px] leading-relaxed h-40 overflow-y-auto"
        style={{ background: isOverlay ? "#1A0E0E" : "#0C0C13" }}
      >
        {lines.length === 0 && <p style={{ color: "#5C5C70" }}>Press Run to execute your code…</p>}
        {lines.map((l, i) => (
          <p key={i} style={{ color: l.color, whiteSpace: "pre-wrap" }}>
            {meta.prompt && !l.noPrompt ? `${meta.prompt} ` : ""}{l.text}
          </p>
        ))}
      </div>
    </div>
  );
}

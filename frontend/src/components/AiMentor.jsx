import React, { useMemo } from "react";
import { Sparkles, X } from "lucide-react";
import GlassCard from "./GlassCard";

export default function AiMentor({ hints = [], attempts, onClose }) {
  const messages = useMemo(() => {
    const base = [
      { text: "I won't hand you the fix, but let's reason through it together. What does the bug report tell you about when the problem happens?" },
    ];
    if (attempts >= 1) {
      base.push({ text: "Look at the highlighted line in the terminal output. What is that error actually telling you — not what you think it should say?" });
    }
    if (attempts >= 2 && hints[0]) {
      base.push({ text: hints[0] });
    }
    if (attempts >= 3) {
      base.push({ text: hints[1] || "Re-read the objective at the top of the problem panel — it names the exact concept this bug tests." });
    }
    return base;
  }, [attempts, hints]);

  return (
    <GlassCard className="p-4" style={{ maxHeight: 340 }}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Sparkles size={15} className="text-violet" />
          <p className="text-sm font-medium text-text">AI Debug Mentor</p>
        </div>
        <button onClick={onClose}><X size={15} className="text-muted" /></button>
      </div>
      <div className="space-y-3 overflow-y-auto pr-1">
        {messages.map((m, i) => (
          <div key={i} className="flex gap-2">
            <div className="w-6 h-6 rounded-md shrink-0 flex items-center justify-center bg-violet/15">
              <Sparkles size={12} className="text-violet" />
            </div>
            <p className="text-xs leading-relaxed text-[#B8B8CC]">{m.text}</p>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}

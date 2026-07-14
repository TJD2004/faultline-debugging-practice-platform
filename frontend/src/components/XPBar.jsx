import React from "react";
import { levelInfo } from "../utils/gamification";

export default function XPBar({ xp = 0 }) {
  const { level, xpIntoLevel, xpForNext } = levelInfo(xp);
  const pct = Math.min(100, Math.round((xpIntoLevel / xpForNext) * 100));
  return (
    <div className="w-full">
      <div className="flex justify-between text-xs font-mono mb-1 text-muted">
        <span>Level {level}</span>
        <span>{xpIntoLevel} / {xpForNext} XP</span>
      </div>
      <div className="h-2 rounded-full overflow-hidden bg-[#1F1F2C]">
        <div
          className="h-full rounded-full transition-all duration-700 bg-gradient-to-r from-violet to-cyan"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

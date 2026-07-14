import React from "react";

export default function Pill({ children, color = "#7C6FFF" }) {
  return (
    <span
      className="px-2.5 py-0.5 rounded-full text-xs font-medium font-mono tracking-wide"
      style={{ color, background: `${color}1a`, border: `1px solid ${color}40` }}
    >
      {children}
    </span>
  );
}

import React from "react";
import { motion } from "framer-motion";

const ICONS = ["{ }", "</>", "[ ]", "( )", "=>", "0x"];

export default function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Drifting gradient orbs */}
      <motion.div
        className="absolute w-[420px] h-[420px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(124,111,255,0.35), transparent 70%)", top: "-10%", left: "-8%" }}
        animate={{ x: [0, 40, -20, 0], y: [0, 30, -10, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-[380px] h-[380px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(79,209,232,0.28), transparent 70%)", bottom: "-12%", right: "-6%" }}
        animate={{ x: [0, -30, 20, 0], y: [0, -25, 15, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-[260px] h-[260px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(52,211,153,0.18), transparent 70%)", top: "40%", left: "45%" }}
        animate={{ x: [0, 25, -25, 0], y: [0, -20, 20, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Faint grid */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(#8B8BA3 1px, transparent 1px), linear-gradient(90deg, #8B8BA3 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Slowly drifting code glyphs */}
      {ICONS.map((glyph, i) => (
        <motion.span
          key={i}
          className="absolute font-mono text-violet/20 select-none"
          style={{
            fontSize: 22 + (i % 3) * 10,
            left: `${(i * 17 + 8) % 92}%`,
            top: `${(i * 29 + 12) % 88}%`,
          }}
          animate={{ y: [0, -18, 0], opacity: [0.12, 0.28, 0.12] }}
          transition={{ duration: 8 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.6 }}
        >
          {glyph}
        </motion.span>
      ))}
    </div>
  );
}

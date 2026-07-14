import React from "react";

/**
 * Wraps children in a thin, continuously rotating conic-gradient ring —
 * a 1.5px "aurora" border. Pure CSS (Tailwind's built-in `spin` keyframes),
 * so it costs nothing extra at runtime.
 */
export default function AuroraBorder({ children, className = "" }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div
        className="absolute inset-[-60%] animate-[spin_5s_linear_infinite]"
        style={{
          background: "conic-gradient(from 0deg, #7C6FFF, #4FD1E8, #34D399, #FBBF24, #7C6FFF)",
        }}
      />
      <div className="relative rounded-[inherit] bg-void m-[1.5px]">{children}</div>
    </div>
  );
}

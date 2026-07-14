import React from "react";

export default function GlassCard({ children, className = "", style = {}, ...rest }) {
  return (
    <div
      className={`rounded-2xl border border-border ${className}`}
      style={{
        background: "linear-gradient(180deg, rgba(25,25,37,0.7), rgba(18,18,27,0.7))",
        backdropFilter: "blur(10px)",
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}

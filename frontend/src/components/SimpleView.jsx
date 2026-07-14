import React from "react";
import Layout from "./Layout";
import GlassCard from "./GlassCard";

export default function SimpleView({ title, subtitle, icon: Icon }) {
  return (
    <Layout>
      <div className="p-6 max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-2">
          {Icon && <Icon size={22} className="text-violet" />}
          <h1 className="font-display text-2xl font-semibold text-text">{title}</h1>
        </div>
        <p className="text-sm text-muted mb-6">{subtitle}</p>
        <GlassCard className="p-10 text-center">
          <p className="text-sm text-muted">
            This section shares the same challenge engine as Practice — it just needs its own
            API route and data model to go live.
          </p>
        </GlassCard>
      </div>
    </Layout>
  );
}

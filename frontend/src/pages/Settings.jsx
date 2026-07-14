import React from "react";
import { motion } from "framer-motion";
import { Settings as SettingsIcon, Sun, Moon, Monitor, RotateCcw } from "lucide-react";
import Layout from "../components/Layout";
import GlassCard from "../components/GlassCard";
import { useSettings } from "../context/SettingsContext";

function Toggle({ checked, onChange }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className="w-11 h-6 rounded-full relative shrink-0 transition-colors"
      style={{ background: checked ? "#7C6FFF" : "#2A2A3A" }}
    >
      <motion.div
        className="w-4.5 h-4.5 rounded-full bg-white absolute top-0.5"
        style={{ width: 18, height: 18 }}
        animate={{ left: checked ? 22 : 3 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
    </button>
  );
}

function Row({ label, description, children }) {
  return (
    <div className="flex items-center justify-between gap-4 py-4" style={{ borderBottom: "1px solid #1E1E2B" }}>
      <div>
        <p className="text-sm text-text">{label}</p>
        {description && <p className="text-xs text-muted mt-0.5">{description}</p>}
      </div>
      {children}
    </div>
  );
}

export default function Settings() {
  const { settings, updateSetting, resetSettings, FONT_STACKS } = useSettings();

  const themeOptions = [
    { id: "light", label: "Light", icon: Sun },
    { id: "dark", label: "Dark", icon: Moon },
    { id: "system", label: "System", icon: Monitor },
  ];

  return (
    <Layout>
      <div className="p-6 max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <SettingsIcon size={22} className="text-violet" />
            <h1 className="font-display text-2xl font-semibold text-text">Settings</h1>
          </div>
          <button
            onClick={resetSettings}
            className="flex items-center gap-1.5 text-xs text-muted hover:text-text px-3 py-1.5 rounded-lg border border-border"
          >
            <RotateCcw size={12} /> Reset to defaults
          </button>
        </div>

        <GlassCard className="p-6 mb-4">
          <p className="text-sm font-medium text-text mb-3">Theme</p>
          <div className="grid grid-cols-3 gap-2">
            {themeOptions.map((t) => (
              <button
                key={t.id}
                onClick={() => updateSetting("theme", t.id)}
                className="flex flex-col items-center gap-2 py-3 rounded-xl border text-xs font-medium"
                style={{
                  borderColor: settings.theme === t.id ? "#7C6FFF" : "#262635",
                  background: settings.theme === t.id ? "rgba(124,111,255,0.1)" : "transparent",
                  color: settings.theme === t.id ? "#E7E7EF" : "#8B8BA3",
                }}
              >
                <t.icon size={16} />
                {t.label}
              </button>
            ))}
          </div>
          <p className="text-[11px] text-slate-500 mt-3">
            Light mode is a first pass — some elements with custom gradients may not fully match yet.
          </p>
        </GlassCard>

        <GlassCard className="p-6 mb-4">
          <p className="text-sm font-medium text-text mb-1">Code editor</p>
          <p className="text-xs text-muted mb-2">Applies to the editor in Challenge and Project Mode screens.</p>

          <Row label="Font size" description={`${settings.editorFontSize}px`}>
            <input
              type="range"
              min={11}
              max={20}
              value={settings.editorFontSize}
              onChange={(e) => updateSetting("editorFontSize", Number(e.target.value))}
              className="w-40 accent-violet"
            />
          </Row>

          <Row label="Font family">
            <select
              value={settings.editorFontFamily}
              onChange={(e) => updateSetting("editorFontFamily", e.target.value)}
              className="bg-surface2 border border-border rounded-lg px-3 py-1.5 text-xs text-text outline-none"
            >
              {Object.keys(FONT_STACKS).map((f) => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
          </Row>

          <div className="pt-4">
            <p className="text-[11px] text-slate-500 mb-1">Preview</p>
            <div
              className="rounded-lg p-3 bg-void border border-border"
              style={{ fontFamily: FONT_STACKS[settings.editorFontFamily], fontSize: settings.editorFontSize }}
            >
              <span style={{ color: "#7C6FFF" }}>function</span>{" "}
              <span style={{ color: "#4FD1E8" }}>debug</span>
              <span style={{ color: "#D6D6E6" }}>() {"{"} return 42; {"}"}</span>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <Row label="Auto Save" description="Automatically save your in-progress code for each challenge in this browser.">
            <Toggle checked={settings.autoSave} onChange={(v) => updateSetting("autoSave", v)} />
          </Row>
          <div style={{ borderBottom: "none" }}>
            <Row label="Reduce Animations" description="Minimize motion and transition effects across the app.">
              <Toggle checked={settings.reduceAnimations} onChange={(v) => updateSetting("reduceAnimations", v)} />
            </Row>
          </div>
        </GlassCard>
      </div>
    </Layout>
  );
}

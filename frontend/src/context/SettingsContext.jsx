import React, { createContext, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "faultline_settings";

const DEFAULTS = {
  theme: "dark", // "light" | "dark" | "system"
  editorFontSize: 13,
  editorFontFamily: "JetBrains Mono",
  autoSave: true,
  reduceAnimations: false,
};

const FONT_STACKS = {
  "JetBrains Mono": '"JetBrains Mono", monospace',
  "Fira Code": '"Fira Code", monospace',
  "Source Code Pro": '"Source Code Pro", monospace',
  Consolas: "Consolas, monospace",
  Menlo: "Menlo, Monaco, monospace",
};

function loadSettings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULTS;
    return { ...DEFAULTS, ...JSON.parse(raw) };
  } catch {
    return DEFAULTS;
  }
}

function applyResolvedTheme(theme) {
  const isLight =
    theme === "light" || (theme === "system" && window.matchMedia("(prefers-color-scheme: light)").matches);
  document.documentElement.classList.toggle("light", isLight);
}

const SettingsContext = createContext(null);

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(loadSettings);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    applyResolvedTheme(settings.theme);
    document.documentElement.classList.toggle("reduce-motion", settings.reduceAnimations);
  }, [settings]);

  // Keep "system" theme in sync if the OS preference changes while the app is open.
  useEffect(() => {
    if (settings.theme !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: light)");
    const handler = () => applyResolvedTheme("system");
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [settings.theme]);

  const updateSetting = (key, value) => setSettings((prev) => ({ ...prev, [key]: value }));
  const resetSettings = () => setSettings(DEFAULTS);

  const editorFontFamilyCss = FONT_STACKS[settings.editorFontFamily] || FONT_STACKS["JetBrains Mono"];

  return (
    <SettingsContext.Provider value={{ settings, updateSetting, resetSettings, editorFontFamilyCss, FONT_STACKS }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}

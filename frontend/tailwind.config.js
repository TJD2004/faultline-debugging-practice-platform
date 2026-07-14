/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        void: "#0A0A0F",
        surface: "#12121B",
        surface2: "#191925",
        border: "#262635",
        text: "#E7E7EF",
        muted: "#8B8BA3",
        violet: "#7C6FFF",
        cyan: "#4FD1E8",
        success: "#34D399",
        error: "#F87171",
        warn: "#FBBF24",
      },
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [],
};

import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import ProtectedRoute from "./components/ProtectedRoute";
import { useSettings } from "./context/SettingsContext";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import OAuthSuccess from "./pages/OAuthSuccess";
import Dashboard from "./pages/Dashboard";
import Practice from "./pages/Practice";
import Challenge from "./pages/Challenge";
import Submissions from "./pages/Submissions";
import Leaderboard from "./pages/Leaderboard";
import DailyChallenge from "./pages/DailyChallenge";
import ContestList from "./pages/ContestList";
import ContestDetail from "./pages/ContestDetail";
import ContestRanking from "./pages/ContestRanking";
import Achievements from "./pages/Achievements";
import ProjectList from "./pages/ProjectList";
import ProjectDetail from "./pages/ProjectDetail";
import Bookmarks from "./pages/Bookmarks";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

// Fades + lifts each page in/out on route change, app-wide.
// Duration collapses to ~0 when "Reduce Animations" is on.
function Page({ children }) {
  const { settings } = useSettings();
  const duration = settings.reduceAnimations ? 0.01 : 0.28;
  return (
    <motion.div
      initial={{ opacity: 0, y: settings.reduceAnimations ? 0 : 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: settings.reduceAnimations ? 0 : -10 }}
      transition={{ duration, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Page><Home /></Page>} />
        <Route path="/login" element={<Page><Login /></Page>} />
        <Route path="/signup" element={<Page><Signup /></Page>} />
        <Route path="/oauth-success" element={<Page><OAuthSuccess /></Page>} />

        <Route path="/dashboard" element={<ProtectedRoute><Page><Dashboard /></Page></ProtectedRoute>} />
        <Route path="/practice" element={<ProtectedRoute><Page><Practice /></Page></ProtectedRoute>} />
        <Route path="/challenge/:slug" element={<ProtectedRoute><Page><Challenge /></Page></ProtectedRoute>} />
        <Route path="/submissions" element={<ProtectedRoute><Page><Submissions /></Page></ProtectedRoute>} />
        <Route path="/leaderboard" element={<ProtectedRoute><Page><Leaderboard /></Page></ProtectedRoute>} />

        <Route path="/daily" element={<ProtectedRoute><Page><DailyChallenge /></Page></ProtectedRoute>} />
        <Route path="/contest" element={<ProtectedRoute><Page><ContestList /></Page></ProtectedRoute>} />
        <Route path="/contest/ranking" element={<ProtectedRoute><Page><ContestRanking /></Page></ProtectedRoute>} />
        <Route path="/contest/:slug" element={<ProtectedRoute><Page><ContestDetail /></Page></ProtectedRoute>} />
        <Route path="/achievements" element={<ProtectedRoute><Page><Achievements /></Page></ProtectedRoute>} />
        <Route path="/projects" element={<ProtectedRoute><Page><ProjectList /></Page></ProtectedRoute>} />
        <Route path="/projects/:slug" element={<ProtectedRoute><Page><ProjectDetail /></Page></ProtectedRoute>} />

        <Route path="/bookmarks" element={<ProtectedRoute><Page><Bookmarks /></Page></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Page><Profile /></Page></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><Page><Settings /></Page></ProtectedRoute>} />
      </Routes>
    </AnimatePresence>
  );
}

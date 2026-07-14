import React, { useState } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bug, LayoutDashboard, Code2, FolderGit2, Calendar, Swords, Trophy,
  Award, Bookmark, User, Settings, Menu, X, LogOut, Send,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { titleForXp } from "../utils/gamification";
import ConfirmModal from "./ConfirmModal";

const NAV_ITEMS = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/practice", label: "Practice", icon: Code2 },
  { to: "/submissions", label: "Submissions", icon: Send },
  { to: "/projects", label: "Project Mode", icon: FolderGit2 },
  { to: "/daily", label: "Daily Challenge", icon: Calendar },
  { to: "/contest", label: "Contest", icon: Swords },
  { to: "/leaderboard", label: "Leaderboard", icon: Trophy },
  { to: "/achievements", label: "Achievements", icon: Award },
  { to: "/bookmarks", label: "Bookmarks", icon: Bookmark },
  { to: "/profile", label: "Profile", icon: User },
  { to: "/settings", label: "Settings", icon: Settings },
];

function NavLinks({ location, collapsed, layoutIdPrefix, onNavigate }) {
  return (
    <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
      {NAV_ITEMS.map((item) => {
        const Icon = item.icon;
        const active = location.pathname.startsWith(item.to);
        return (
          <Link
            key={item.to}
            to={item.to}
            onClick={onNavigate}
            className="relative w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors"
            style={{ color: active ? "#E7E7EF" : "#8B8BA3" }}
          >
            {active && (
              <motion.div
                layoutId={layoutIdPrefix}
                className="absolute inset-0 rounded-lg"
                style={{
                  background: "linear-gradient(90deg, rgba(124,111,255,0.16), rgba(124,111,255,0.02))",
                  borderLeft: "2px solid #7C6FFF",
                }}
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            )}
            <Icon size={17} strokeWidth={2} className="relative shrink-0" />
            {!collapsed && <span className="relative">{item.label}</span>}
          </Link>
        );
      })}
    </nav>
  );
}

function UserFooter({ user, collapsed, onLogoutClick }) {
  return (
    <div className="p-3 border-t border-[#1E1E2B]">
      <div className="flex items-center gap-2 px-2 py-2 rounded-lg bg-surface2">
        <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 bg-gradient-to-br from-violet to-cyan text-void font-display">
          {user?.name?.[0]?.toUpperCase() || "?"}
        </div>
        {!collapsed && (
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium truncate text-text">{user?.name}</p>
            <p className="text-[11px] truncate text-muted">{titleForXp(user?.xp)}</p>
          </div>
        )}
        <button
          onClick={onLogoutClick}
          className="p-1.5 rounded-md hover:bg-border text-muted hover:text-error shrink-0"
          title="Log out"
        >
          <LogOut size={14} />
        </button>
      </div>
    </div>
  );
}

export default function Sidebar({ mobileOpen, onCloseMobile }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [confirmingLogout, setConfirmingLogout] = useState(false);

  const doLogout = () => {
    setConfirmingLogout(false);
    logout();
    navigate("/login");
  };

  return (
    <>
      {/* Desktop sidebar — unchanged from before */}
      <aside
        className="hidden md:flex flex-col shrink-0 h-screen sticky top-0 border-r border-[#1E1E2B] bg-[#0D0D14] transition-all"
        style={{ width: collapsed ? 76 : 232 }}
      >
        <div className="flex items-center gap-2 px-4 h-16 border-b border-[#1E1E2B]">
          <motion.div
            className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-gradient-to-br from-violet to-cyan"
            animate={{ rotate: [0, -6, 6, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <Bug size={17} className="text-void" strokeWidth={2.5} />
          </motion.div>
          {!collapsed && <span className="font-display font-semibold text-[15px] text-text">Faultline</span>}
          <button onClick={() => setCollapsed((c) => !c)} className="ml-auto opacity-40 hover:opacity-90">
            <Menu size={16} className="text-text" />
          </button>
        </div>

        <NavLinks location={location} collapsed={collapsed} layoutIdPrefix="sidebar-active-pill-desktop" />
        <UserFooter user={user} collapsed={collapsed} onLogoutClick={() => setConfirmingLogout(true)} />
      </aside>

      {/* Mobile drawer — portaled to document.body so it can never get trapped
          inside a transformed ancestor (same fix as the logout modal). */}
      {createPortal(
        <AnimatePresence>
          {mobileOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[998] md:hidden"
                style={{ background: "rgba(6,6,10,0.6)" }}
                onClick={onCloseMobile}
              />
              <motion.aside
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", stiffness: 320, damping: 34 }}
                className="fixed left-0 top-0 h-full w-72 max-w-[80vw] z-[999] flex flex-col bg-[#0D0D14] border-r border-[#1E1E2B] md:hidden"
              >
                <div className="flex items-center gap-2 px-4 h-16 border-b border-[#1E1E2B]">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-gradient-to-br from-violet to-cyan">
                    <Bug size={17} className="text-void" strokeWidth={2.5} />
                  </div>
                  <span className="font-display font-semibold text-[15px] text-text">Faultline</span>
                  <button onClick={onCloseMobile} className="ml-auto p-1 text-muted hover:text-text">
                    <X size={18} />
                  </button>
                </div>

                <NavLinks location={location} collapsed={false} layoutIdPrefix="sidebar-active-pill-mobile" onNavigate={onCloseMobile} />
                <UserFooter user={user} collapsed={false} onLogoutClick={() => setConfirmingLogout(true)} />
              </motion.aside>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}

      <ConfirmModal
        open={confirmingLogout}
        title="Log out of Faultline?"
        message="You'll need to log back in to continue practicing, and any unsaved code in the editor may be lost."
        confirmLabel="Log out"
        danger
        onCancel={() => setConfirmingLogout(false)}
        onConfirm={doLogout}
      />
    </>
  );
}

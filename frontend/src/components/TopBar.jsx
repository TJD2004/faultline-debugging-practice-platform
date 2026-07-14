import React from "react";
import { useNavigate } from "react-router-dom";
import { Search, Flame, Coins, Zap, Menu } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function TopBar({ onMenuClick }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-2 sm:gap-3 h-16 px-3 sm:px-5 border-b border-[#1E1E2B] sticky top-0 z-20 bg-void/85 backdrop-blur">
      <button
        onClick={onMenuClick}
        className="md:hidden p-2 -ml-1 rounded-lg hover:bg-surface2 text-text shrink-0"
        aria-label="Open menu"
      >
        <Menu size={20} />
      </button>

      <div className="flex items-center gap-2 flex-1 min-w-0 max-w-md px-3 py-2 rounded-lg bg-surface2 border border-border">
        <Search size={15} className="text-muted shrink-0" />
        <input
          placeholder="Search..."
          className="bg-transparent outline-none text-sm w-full text-text placeholder:text-muted min-w-0"
        />
      </div>

      <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface2 border border-border shrink-0">
        <Flame size={15} className="text-warn" />
        <span className="text-sm font-mono text-text">{user?.streak ?? 0}</span>
      </div>
      <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface2 border border-border shrink-0">
        <Coins size={15} className="text-warn" />
        <span className="text-sm font-mono text-text">{user?.coins ?? 0}</span>
      </div>
      <button
        onClick={() => navigate("/practice")}
        className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-sm font-medium bg-gradient-to-r from-violet to-[#6656e0] text-white shrink-0"
      >
        <Zap size={14} /> Start Debugging
      </button>

      {/* Compact icon-only versions for mobile, so streak/coins are still visible without crowding the search bar */}
      <div className="flex sm:hidden items-center gap-1 text-xs font-mono text-warn shrink-0">
        <Flame size={14} /> {user?.streak ?? 0}
      </div>
      <div className="flex sm:hidden items-center gap-1 text-xs font-mono text-warn shrink-0">
        <Coins size={14} /> {user?.coins ?? 0}
      </div>
    </div>
  );
}

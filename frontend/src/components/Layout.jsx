import React, { useState } from "react";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

export default function Layout({ children }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-void">
      <Sidebar mobileOpen={mobileNavOpen} onCloseMobile={() => setMobileNavOpen(false)} />
      <div className="flex-1 min-w-0">
        <TopBar onMenuClick={() => setMobileNavOpen(true)} />
        {children}
      </div>
    </div>
  );
}

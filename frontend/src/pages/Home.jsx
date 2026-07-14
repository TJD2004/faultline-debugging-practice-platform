import React, { Suspense } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Circle } from "lucide-react";
import GlassCard from "../components/GlassCard";
import { useSettings } from "../context/SettingsContext";
import Scene3D from "../components/Scene3D";
import Tilt3DCard from "../components/Tilt3DCard";
import AnimatedBackground from "../components/AnimatedBackground";

const STATS = [
  { label: "Challenges", value: "4+" },
  { label: "Languages", value: "4" },
  { label: "Bugs Fixed", value: "live" },
  { label: "Users", value: "growing" },
];

export default function Home() {
  const { settings } = useSettings();
  return (
    <div className="min-h-screen bg-void relative overflow-hidden">
      <AnimatedBackground />
      <Suspense fallback={null}>
        {!settings.reduceAnimations && <Scene3D className="opacity-70" />}
      </Suspense>

      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-24 pb-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-6 text-xs font-mono border border-border text-muted"
        >
          <Circle size={6} fill="#34D399" className="text-success" /> real compiler checks · real MySQL data
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-5xl sm:text-6xl font-semibold leading-tight mb-6 text-text"
        >
          Master Debugging,
          <br />
          <motion.span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: "linear-gradient(90deg, #7C6FFF, #4FD1E8, #7C6FFF)",
              backgroundSize: "200% auto",
            }}
            animate={{ backgroundPosition: ["0% center", "200% center"] }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          >
            Not Just Coding.
          </motion.span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-xl mx-auto text-base mb-9 text-muted"
        >
          Practice real compiler errors, runtime bugs, and production failures — validated by an actual backend,
          not a fake demo.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center justify-center gap-3 flex-wrap mb-16"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}>
            <Link
              to="/signup"
              className="px-5 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 bg-gradient-to-r from-violet to-[#6656e0] text-white shadow-[0_8px_24px_-8px_rgba(124,111,255,0.6)]"
            >
              Create free account <ArrowRight size={15} />
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}>
            <Link to="/login" className="px-5 py-2.5 rounded-lg text-sm font-medium border border-border text-text block">
              I already have an account
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30, rotateX: -10 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformPerspective: 1200 }}
        >
          <Tilt3DCard className="max-w-2xl mx-auto rounded-2xl" maxTilt={5}>
            <GlassCard className="text-left overflow-hidden">
              <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-border">
                <span className="w-2.5 h-2.5 rounded-full bg-error" />
                <span className="w-2.5 h-2.5 rounded-full bg-warn" />
                <span className="w-2.5 h-2.5 rounded-full bg-success" />
                <span className="ml-3 text-xs font-mono text-muted">bug-report.log</span>
              </div>
              <div className="p-4 font-mono text-[13px] leading-relaxed">
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="text-error">
                  &gt; The login button stopped working.
                </motion.p>
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="text-muted">
                  $ inspecting authController.js...
                </motion.p>
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0 }} className="text-warn">
                  ! Cannot set headers after they are sent to the client
                </motion.p>
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="text-muted">
                  $ patching missing return statement...
                </motion.p>
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }} className="text-success">
                  ✓ 200 OK — login flow restored
                </motion.p>
              </div>
            </GlassCard>
          </Tilt3DCard>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-16">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 + i * 0.08, duration: 0.4 }}
            >
              <p className="font-display text-2xl font-semibold text-text">{s.value}</p>
              <p className="text-xs mt-1 text-muted">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

import React, { Suspense, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Bug, ArrowRight, Lock, Mail } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useSettings } from "../context/SettingsContext";
import AnimatedBackground from "../components/AnimatedBackground";
import Scene3D from "../components/Scene3D";
import Tilt3DCard from "../components/Tilt3DCard";
import AuroraBorder from "../components/AuroraBorder";

export default function Login() {
  const { login, loginWithGoogle } = useAuth();
  const { settings } = useSettings();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen bg-void relative flex items-center justify-center px-4 overflow-hidden">
      <AnimatedBackground />
      <Suspense fallback={null}>
        {!settings.reduceAnimations && <Scene3D />}
      </Suspense>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-sm"
      >
        <motion.div
          className="flex items-center gap-2 justify-center mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          <motion.div
            className="w-11 h-11 rounded-xl flex items-center justify-center bg-gradient-to-br from-violet to-cyan shadow-[0_0_36px_rgba(124,111,255,0.55)]"
            animate={{ rotateY: [0, 180, 360] }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <Bug size={22} className="text-void" />
          </motion.div>
          <span className="font-display font-semibold text-text text-xl">Faultline</span>
        </motion.div>

        <Tilt3DCard className="rounded-2xl" maxTilt={8}>
          <AuroraBorder className="rounded-2xl">
            <div
              className="rounded-2xl p-7"
              style={{
                background: "linear-gradient(180deg, rgba(25,25,37,0.9), rgba(12,12,18,0.94))",
                backdropFilter: "blur(18px)",
                boxShadow: "0 24px 70px -20px rgba(124,111,255,0.3), inset 0 1px 0 rgba(255,255,255,0.05)",
              }}
            >
              <h1 className="font-display text-xl font-semibold text-text mb-1">Welcome back</h1>
              <p className="text-sm text-muted mb-6">Log in to keep your streak alive.</p>

              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-4 px-3 py-2 rounded-lg bg-error/10 border border-error/30 text-error text-xs overflow-hidden"
                  >
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-3">
                <FloatingField icon={Mail} type="email" label="Email" value={email} onChange={setEmail} placeholder="you@example.com" />
                <FloatingField icon={Lock} type="password" label="Password" value={password} onChange={setPassword} placeholder="••••••••" />

                <motion.button
                  type="submit"
                  disabled={busy}
                  whileHover={{ scale: 1.03, boxShadow: "0 10px 30px -8px rgba(124,111,255,0.8)" }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full py-2.5 rounded-lg text-sm font-medium bg-gradient-to-r from-violet to-[#6656e0] text-white disabled:opacity-60 flex items-center justify-center gap-2 shadow-[0_8px_24px_-8px_rgba(124,111,255,0.6)]"
                >
                  {busy ? (
                    <motion.span animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 1, repeat: Infinity }}>
                      Logging in…
                    </motion.span>
                  ) : (
                    <>Log in <ArrowRight size={15} /></>
                  )}
                </motion.button>
              </form>

              <div className="flex items-center gap-3 my-5">
                <div className="flex-1 h-px bg-border" />
                <span className="text-[11px] text-muted">or</span>
                <div className="flex-1 h-px bg-border" />
              </div>

              <motion.button
                onClick={loginWithGoogle}
                whileHover={{ scale: 1.03, borderColor: "#7C6FFF", y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="w-full py-2.5 rounded-lg text-sm font-medium border border-border text-text flex items-center justify-center gap-2 bg-surface2/60"
              >
                <GoogleIcon /> Continue with Google
              </motion.button>

              <p className="text-xs text-muted text-center mt-6">
                No account? <Link to="/signup" className="text-violet hover:underline">Sign up</Link>
              </p>
            </div>
          </AuroraBorder>
        </Tilt3DCard>
      </motion.div>
    </div>
  );
}

function FloatingField({ icon: Icon, type, label, value, onChange, placeholder }) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <label className="text-xs text-muted mb-1 block">{label}</label>
      <motion.div
        animate={{
          borderColor: focused ? "#7C6FFF" : "#262635",
          boxShadow: focused ? "0 0 0 3px rgba(124,111,255,0.18)" : "0 0 0 0px rgba(124,111,255,0)",
        }}
        className="flex items-center gap-2 rounded-lg bg-surface2 border px-3 py-2"
      >
        <motion.div animate={{ scale: focused ? 1.15 : 1, rotate: focused ? -8 : 0 }}>
          <Icon size={14} className={focused ? "text-violet" : "text-muted"} />
        </motion.div>
        <input
          type={type}
          required
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full bg-transparent outline-none text-text text-sm placeholder:text-slate-600"
          placeholder={placeholder}
        />
      </motion.div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 48 48">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.5 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.5z" />
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.5 15.9 18.9 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.5 0 10.4-1.9 14.3-5.1l-6.6-5.6C29.6 35.1 27 36 24 36c-5.3 0-9.7-3.5-11.3-8.4l-6.6 5.1C9.6 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.2 5.7l6.6 5.6C41.5 36.6 44 30.9 44 24c0-1.3-.1-2.7-.4-3.5z" />
    </svg>
  );
}

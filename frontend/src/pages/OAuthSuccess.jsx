import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function OAuthSuccess() {
  const [params] = useSearchParams();
  const { loginWithToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const token = params.get("token");
    if (!token) {
      navigate("/login?error=oauth");
      return;
    }
    loginWithToken(token).then(() => navigate("/dashboard"));
  }, []);

  return (
    <div className="min-h-screen bg-void flex items-center justify-center">
      <p className="text-muted text-sm">Signing you in…</p>
    </div>
  );
}

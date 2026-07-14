const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const { signup, login, me } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// --- Manual auth ---
router.post("/signup", signup);
router.post("/login", login);
router.get("/me", protect, me);

// --- Google OAuth ---
// 1. Frontend/app links/redirects the browser here.
//    Mobile calls this with ?platform=mobile&redirect_uri=<exact deep link>
//    since Expo Go's dev deep links (exp://...) differ from a standalone
//    build's real scheme (faultline://) — the app knows which one it needs.
const ALLOWED_MOBILE_REDIRECT_PREFIXES = ["faultline://", "exp://"];

router.get("/google", (req, res, next) => {
  const isMobile = req.query.platform === "mobile";
  const redirectUri =
    isMobile && ALLOWED_MOBILE_REDIRECT_PREFIXES.some((p) => (req.query.redirect_uri || "").startsWith(p))
      ? req.query.redirect_uri
      : null;
  // Smuggle both flags through Google's `state` param (round-tripped verbatim).
  const state = isMobile ? `mobile:${encodeURIComponent(redirectUri || process.env.MOBILE_REDIRECT_SCHEME || "faultline://")}` : "web";
  passport.authenticate("google", { scope: ["profile", "email"], session: false, state })(req, res, next);
});

// 2. Google redirects back here. We issue our own JWT and hand it off via a
//    redirect — to the website's callback page, or to the app's deep link,
//    based on which one initiated the flow (echoed back in `state`).
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: `${process.env.CLIENT_URL}/login?error=oauth` }),
  (req, res) => {
    const token = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    });
    const state = req.query.state || "";
    if (state.startsWith("mobile:")) {
      const redirectUri = decodeURIComponent(state.slice("mobile:".length));
      const separator = redirectUri.includes("?") ? "&" : "?";
      res.redirect(`${redirectUri}${separator}token=${token}`);
    } else {
      res.redirect(`${process.env.CLIENT_URL}/oauth-success?token=${token}`);
    }
  }
);

module.exports = router;

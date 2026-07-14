const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails && profile.emails[0] ? profile.emails[0].value : null;
        const avatar = profile.photos && profile.photos[0] ? profile.photos[0].value : null;

        let user = await User.findOne({ googleId: profile.id });
        if (user) return done(null, user);

        if (email) {
          user = await User.findOne({ email });
          if (user) {
            user.googleId = profile.id;
            user.avatarUrl = avatar;
            await user.save();
            return done(null, user);
          }
        }

        const created = await User.create({
          name: profile.displayName || "New User",
          email,
          googleId: profile.id,
          avatarUrl: avatar,
        });
        return done(null, created);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => done(null, { id }));

module.exports = passport;

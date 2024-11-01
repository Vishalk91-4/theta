const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/user");
const { generateToken } = require("../utils/jwtUtils");
require('dotenv').config();

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost:4000/auth/google/redirect",
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                let user = await User.findOne({ googleID: profile.id });
                if (!user) {
                    user = new User({
                        googleID: profile.id,
                        email: profile.emails[0].value,
                        name: profile.displayName,
                    });

                    await user.save();
                }

                const token = generateToken(user);
                return done(null, { token });
            } catch (err) {
                return done(err, null);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user.token);
});

passport.deserializeUser((token, done) => {
    done(null, { token });
});

module.exports = passport;

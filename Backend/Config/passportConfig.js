import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../model/user.js';
import dotenv from 'dotenv';
dotenv.config();

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://localhost:5000/api/auth/google/callback'
},
async (accessToken, refreshToken, profile, done) => {
  try {
    // Check if the user already exists
    let user = await User.findOne({ googleId: profile.id });
    if (user) {
      return done(null, user);
    }

    // If user doesn't exist, create a new user
    user = new User({
      fullName: profile.displayName,
      email: profile.emails[0].value,
      googleId: profile.id,
      isVerified: true
    });
    await user.save();
    done(null, user);
  } catch (error) {
    done(error, false);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, false);
  }
});
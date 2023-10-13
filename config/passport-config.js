import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import User from "../model/userModel.js";
// Passport setup for Google OAuth 2.0
passport.use(
  new GoogleStrategy(
    {
      // Client ID, Client Secret, and Callback URL
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if the user already exists in MongoDB
        const existingUser = await User.findOne({ googleId: profile.id });

        if (existingUser) {
          // User already exists, update their data if needed
          // For example, you may want to update the user's access token here
          return done(null, existingUser);
        }

        // User doesn't exist, create a new user document in MongoDB
        const newUser = new User({
          googleId: profile.id,
          displayName: profile.displayName,
          // Add other relevant user data here
        });

        // Save the new user document
        await newUser.save();

        // Call done to indicate successful authentication
        done(null, newUser);
      } catch (error) {
        // Handle errors
        done(error);
      }
    }
  )
);

// Serialize and deserialize user for session management
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

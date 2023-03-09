
const LocalStrategy = require('passport-local').Strategy
const GitHubStrategy = require('passport-github2').Strategy;
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const User = require("../persistence/model/User")
const passport = require("passport")

// Local Strategy
passport.use(new LocalStrategy(
  {
    _usernameField: 'user',
    _passwordField: 'password',
  },
  async (username, password, done) => {
    const storedUser = await User.findOne({ 'loginInfo.user': username });
    if (!storedUser) {
      console.log(`User: ${_user} not found.`);
      return done(null, false);
    }
    const isPasswordMatched = await storedUser.comparePassword(password);
    if (!isPasswordMatched)
      return done(null, false);
    return done(null, storedUser);
  }))

// Github Strategy

passport.use(new GitHubStrategy({
  clientID: process.env.CLIENT_GITHUB_ID,
  clientSecret: process.env.CLIENT_GITHUB_SEC,
  callbackURL: process.env.CLIENT_GITHUB_CB,
  passReqToCallback: true,
},
  function (accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }

));

// Google Strategy

passport.use(new GoogleStrategy({
  clientID: process.env.CLIENT_GOOGLE_ID,
  clientSecret: process.env.CLIENT_GOOGLE_SEC,
  callbackURL: process.env.CLIENT_GOOGLE_CB,
  passReqToCallback: true
}, (request, accessToken, refreshToken, profile, done) => {
  return done(null, profile);
}
))



// Serialize user
passport.serializeUser((user, done) => {
  done(null, user);
});

// Deserialize user
passport.deserializeUser((user, done) => {
  done(null, user)
});


module.exports = passport
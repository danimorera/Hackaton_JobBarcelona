const passport = require('passport');
require('dotenv').config();

const GitHubStrategy = require('passport-github').Strategy;

passport.use(
  new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "/api/auth/github/redirect"
  },
    (accessToken, refreshToken, profile, cb) => {

      console.log(profile)
      User.findOrCreate({ githubId: profile.id }, (err, user) => {
        return cb(err, user);
      });
    }
  ));
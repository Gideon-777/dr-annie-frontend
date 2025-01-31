const mongoose = require('mongoose');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;


const User = mongoose.model('users');
const keys = require('./../config/keys');

module.exports = passport => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id).then(user => done(null, user));
  });

  passport.use(new GoogleStrategy({
      clientID: keys.googleClientId,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/api/auth/google/callback"
    },
    function (accessToken, refreshToken, profile, done) {
      User.findOne({email: profile._json.email}).then((existingUser) => {
        if (existingUser) {
          return done(null, existingUser);
        }
        new User({
          googleId: profile.id,
          email: profile._json.email,
          isVerified: profile._json.email_verified,
          firstName: profile._json.given_name,
          lastName: profile._json.family_name,
        }).save().then(user => done(null, user));
      });
    }
  ));
};

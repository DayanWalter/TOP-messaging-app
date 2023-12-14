const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'SECRET_KEY'; //normally store this in process.env.secret

module.exports = new JwtStrategy(opts, async (jwt_payload, done) => {
  const user = await User.findOne({ username: jwt_payload.username });
  if (jwt_payload.username === user.username) {
    return done(null, true);
  }
  return done(null, false);
});

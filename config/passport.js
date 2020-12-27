const FacebookTokenStrategy = require('passport-facebook-token');
const config = require('./config')
const logger = require('../logging/logger')

module.exports = function (passport) {
    passport.use(new FacebookTokenStrategy({
        clientID: config.facebookAuth.clientID,
        clientSecret: config.facebookAuth.clientSecret,
        fbGraphVersion: 'v8.0'
    }, function (accessToken, refreshToken, profile, done) {
        var user = {
            'email': profile.emails[0].value,
            'name': profile.name.givenName + ' ' + profile.name.familyName,
            'id': profile.id,
            'token': accessToken
        }

        // You can perform any necessary actions with your user at this point,
        // e.g. internal verification against a users table,
        // creating new user entries, etc.

        return done(null, user); // the user object we just made gets passed to the route's controller as `req.user`
    }
    ));
}
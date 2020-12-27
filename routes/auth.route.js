const express = require('express');
const config = require('../config/config')
const router = express.Router();
var passport = require('passport')
const FacebookTokenStrategy = require('passport-facebook-token');
const logger = require('../logging/logger')

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

router.post('/facebook/token',
    passport.authenticate('facebook-token'),
    function (req, res) {
        if (req.user) {
            //you're authenticated! return sensitive secret information here.
            res.send(200, { 'secrets': ['array', 'of', 'top', 'secret', 'information'] });
        } else {
            // not authenticated. go away.
            res.send(401)
        }
    }
);

module.exports = router; 
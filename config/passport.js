const FacebookTokenStrategy = require('passport-facebook-token');
const config = require('./config')
const userController = require('../controllers/user.controller')
const logger = require('../logging/logger')

module.exports = function (passport) {
    passport.use(new FacebookTokenStrategy({
        clientID: config.facebookAuth.clientID,
        clientSecret: config.facebookAuth.clientSecret,
        fbGraphVersion: 'v8.0',
        profileFields: ['id', 'displayName', 'gender', 'photos', 'emails']
    }, async function (accessToken, refreshToken, profile, done) {
        try {
            let existingUser = await userController.GetUserByID(profile.id);
            if (existingUser != null) { //user exists, just return the id
                return done(null, { id: profile.id, new: false })
            }
        } catch (e) {
            logger.error(e)
            return done(e)
        }

        //User doesnt exist, create a new one
        var user = {
            'email': profile.emails[0].value,
            'name': profile.displayName,
            'id': profile.id
        }

        try {
            userController.CreateNewUser(user)
        } catch (e) {
            logger.error(e)
            return done(e)
        }
        return done(null, { id: profile.id, new: true }); // the user object we just made gets passed to the route's controller as `req.user`

    }
    ));
}
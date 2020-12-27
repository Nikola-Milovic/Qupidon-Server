const express = require('express');
const config = require('../config/config')
const router = express.Router();
var passport = require('passport');
const logger = require('../logging/logger');

router.post('/facebook/token',
    passport.authenticate('facebook-token', { session: false }),
    function (req, res) {
        if (req.user) {
            //you're authenticated! return sensitive secret information here.
            res.status(200).send(req.user);
        } else {
            // not authenticated. go away.
            res.send(401)
        }
    }
);

module.exports = router; 
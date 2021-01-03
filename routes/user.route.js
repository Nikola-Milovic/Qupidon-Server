const express = require('express');
const router = express.Router();
const logger = require('../logging/logger');
const userController = require('../controllers/user.controller')

//Todo update the user with the given id
//TODO add verification of the bio and the other parameters
// Respond 200 if success or other if failure
router.post('/profile',
    async function (req, res) {
        if (userController.NewUserProfileUpdate(req)) {
            res.sendStatus(404)
            return
        }

        //logger.info("latitude : " + req.body.location.latitude + " " + " longitude : " + req.body.location.longitude)
        //  let loc = geo.toLatLon({ latitude: req.body.location.latitude, longitude: req.body.location.longitude })
        //  let loc2 = geo.toLatLon({ latitude: 44.761792, longitude: 20.411646 })
        // logger.info(geo.distanceTo(loc, loc2))
        res.sendStatus(200)
    }
);

module.exports = router; 
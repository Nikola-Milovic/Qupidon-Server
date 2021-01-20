const express = require('express');
const router = express.Router();
const logger = require('../logging/logger');
const userController = require('../controllers/user.controller')

//Todo update the user with the given id
//TODO add verification of the bio and the other parameters
// Respond 200 if success or other if failure
router.post('/profile',
    async function (req, res) {
        let success = await userController.NewUserProfileUpdate(req)
        if (!success) return res.sendStatus(400)
        res.sendStatus(200)
    }
);

router.get('/profile',
    async function (req, res) {
        let profile = await userController.GetUserByID(req.query.id)
        res.send(profile).status(200);
    }
);

module.exports = router; 
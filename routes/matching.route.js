const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller')
const locationController = require('../controllers/location.controller')

router.get('/matches',
    async function (req, res) {
        await locationController.GetUsersCloseToLocation(req.query.id, 300000);
        res.sendStatus(200);
    }
);

module.exports = router; 
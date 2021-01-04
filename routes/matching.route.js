const express = require('express');
const router = express.Router();
const MatchController = require('../controllers/match.controller')

router.get('/matches',
    async function (req, res) {
        await MatchController.GetMatches(req.query.id)
        res.sendStatus(200);
    }
);

module.exports = router; 
const express = require('express');
const router = express.Router();
const MatchController = require('../controllers/match.controller')
const UserController = require('../controllers/user.controller')

router.get('/matches',
    async function (req, res) {
        const matches = await MatchController.GetMatches(req.query.id)

        var profiles = []
        for (const user of matches) {
            profiles.push({
                user_id: user.user_id, profile_pic: user.profile_picture,
                name: user.name, bio: user.bio
            })
        }


        res.send(profiles);
    }
);

module.exports = router; 
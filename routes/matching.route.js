const express = require('express');
const router = express.Router();
const MatchController = require('../controllers/match.controller')
const InteractionsController = require('../controllers/interactions.controller')
const UserController = require('../controllers/user.controller')

router.get('/profiles',
    async function (req, res) {
        const matches = await MatchController.GetProfiles(req.query.id)

        var profiles = []
        for (const user of matches) {
            profiles.push({
                user_id: user.user_id, profile_pic: `${user.profile_picture}_medium.png`,
                name: user.name, bio: user.bio
            })
        }

        console.log("PROFILES")
        console.log(profiles)

        res.send(profiles);
    }
);

router.get('/matches',
    async function (req, res) {
        const matches = await InteractionsController.GetMatches(req.query.id)

        console.log("Matches")
        console.log(matches)
        res.send(matches).status(200);
    }
);

router.get('/matches/profile',
    async function (req, res) {
        const user = await UserController.GetUserByID(req.query.id)

        res.send({ "profile_pic": `${user.profile_picture}_small.png`, "name": user.name }).status(200);
    }
);

router.post('/like',
    async function (req, res) {
        await InteractionsController.LikeUser(req.query.id, req.body.like_id)
        let isMatch = await MatchController.CheckForMatch(req.body.like_id, req.query.id)
        if (isMatch) {
            InteractionsController.AddMatch(req.query.id, req.body.like_id)
        }
        res.sendStatus(200)
    }
);

router.post('/reject',
    async function (req, res) {
        console.log(req.body)
        await InteractionsController.RejectUser(req.query.id, req.body.rejected_id)
        res.sendStatus(200);
    });

module.exports = router; 
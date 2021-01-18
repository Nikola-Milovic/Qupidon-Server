const multer = require('multer')
const express = require('express');
const router = express.Router();
const logger = require('../logging/logger');

const UserController = require('../controllers/user.controller')
const imageController = require('../controllers/image.controller')

var storage = multer.memoryStorage();
var upload = multer({ storage: storage });

router.post(
    "/ppic",
    upload.single('profile_pic'), async function (req, res) {
        console.log(req.file.buffer)
        try {
            const imageLink = await imageController.UploadProfileImage(req.file)
            console.log("Image link is " + imageLink)
            const updateResult = await UserController.UpdateUserProfileImage(req.body.user_id, imageLink)
        } catch (e) {
            logger.error(e)
            return res.sendStatus(400)
        }

        return res.sendStatus(200)
    });

module.exports = router;
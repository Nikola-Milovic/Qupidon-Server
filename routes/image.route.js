const multer = require('multer')
const express = require('express');
const router = express.Router();
const logger = require('../logging/logger');

const UserController = require('../controllers/user.controller')
const imageController = require('../controllers/image.controller')

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, "./uploads/");
    },
    filename(req, file = {}, cb) {
        const { originalname } = file;
        const fileExtension = (originalname.match(/\.+[\S]+$/) || [])[0];
        cb(null, `${file.fieldname}__${Date.now()}${fileExtension}`);
    },
});

var upload = multer({ storage: storage });

router.post(
    "/upload",
    upload.single('profile_pic'), async function (req, res) {
        try {
            const imageLink = await imageController.UploadImage(req.file)
            console.log("Image link is " + imageLink)
            const updateResult = await UserController.UpdateUserProfileImage(req.body.user_id, imageLink)
        } catch (e) {
            logger.error(e)
            return res.sendStatus(400)
        }

        return res.sendStatus(200)
    });

module.exports = router;
const multer = require('multer')
const path = require('path');
const crypto = require('crypto');
const express = require('express');
const router = express.Router();
const logger = require('../logging/logger');

// Include the node file module
const fs = require('fs');

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
    upload.single('profile_pic'), function (req, res) {
        console.log("Image")
        console.log(req.file);
        console.log(req.body.user_id)
        return res.sendStatus(200)
    });

// app.get('/uploads/:upload', function (req, res) {
//     file = req.params.upload;
//     console.log(req.params.upload);
//     var img = fs.readFileSync(__dirname + "/uploads/" + file);
//     res.writeHead(200, { 'Content-Type': 'image/png' });
//     res.end(img, 'binary');

// });

module.exports = router;
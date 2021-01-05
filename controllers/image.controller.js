const multer = require('multer')
const path = require('path');
const crypto = require('crypto');
const express = require('express');
const router = express.Router();
const logger = require('../logging/logger');

// Include the node file module
// const fs = require('fs');

// const storage = multer.diskStorage({
//     destination: '../uploads/',
//     filename: function (req, file, cb) {
//         return crypto.pseudoRandomBytes(16, function (err, raw) {
//             if (err) {
//                 return cb(err);
//             }
//             return cb(null, "" + (raw.toString('hex')) + (path.extname(file.originalname)));
//         });
//     }
// });

// router.post(
//     "/upload",
//     multer({
//         storage: storage
//     }).single('upload'), function (req, res) {
//         console.log(req.file);
//         console.log(req.body);
//         console.log(req.file.filename);
//         return res.status(200).end();
//     });

// app.get('/uploads/:upload', function (req, res) {
//     file = req.params.upload;
//     console.log(req.params.upload);
//     var img = fs.readFileSync(__dirname + "/uploads/" + file);
//     res.writeHead(200, { 'Content-Type': 'image/png' });
//     res.end(img, 'binary');

// });

module.exports = router;
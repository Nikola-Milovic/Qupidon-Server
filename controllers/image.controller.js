const logger = require('../logging/logger');
const config = require('../config/config')

const aws = require('aws-sdk');

// Include the node file module
const fs = require('fs');

async function UploadImage(file) {
    aws.config.update({
        accessKeyId: config['aws-config-images'].accessKeyId,
        secretAccessKey: config['aws-config-images'].secretAccessKey,
        region: config['aws-config-images'].region
    });

    const fileExtension = (file.originalname.match(/\.+[\S]+$/) || [])[0];
    const filename = `${file.fieldname}__${Date.now()}${fileExtension}`


    // Read content from the file
    const fileContent = fs.createReadStream(file.path)

    const s3 = new aws.S3();

    // Setting up S3 upload parameters
    const params = {
        ACL: 'public-read',
        Bucket: "qupidon-images",
        Key: filename, // File name you want to save as in S3
        Body: fileContent,
    };

    //Uploading files to the bucket
    const result = await s3.upload(params, function (err, data) {
        if (err) {
            throw err
        }
        console.log(`File uploaded successfully. ${data.Location}`);
        if (data) {
            fs.unlinkSync(path); // Empty temp folder
        }
    }).promise()

    console.log(result)

    return result.Location
};

module.exports.UploadImage = UploadImage
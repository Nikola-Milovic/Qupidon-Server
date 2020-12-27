const logger = require('../logging/logger');
const UserModel = require('../models/user.model')


async function GetUserByID(id) {
    let user = await UserModel.User.findOne({ userID: id }).exec();
    return user;
}

async function CreateNewUser(profile) {
    let newUser = { name: profile.name, userID: profile.id, email: profile.email }
    await UserModel.User.create(newUser, function (err, small) {
        if (err) {
            logger.error(err)
        }
        logger.info("Successfuly saved")
    });
}

exports.GetUserByID = GetUserByID
exports.CreateNewUser = CreateNewUser
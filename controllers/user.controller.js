const { Mongoose, mongo } = require('mongoose');
const logger = require('../logging/logger');
const UserModel = require('../models/user.model')
const LocationController = require('./location.controller')

//GetUserByID return the user if it exists or null if the user doesnt exist
async function GetUserByID(id) {
    let user = await UserModel.User.findOne({ userID: id }).exec();
    return user;
}

//Returns error if something went wrong
async function CreateNewUser(profile) {
    let newUser = { name: profile.name, user_id: profile.id, email: profile.email }
    await UserModel.User.create(newUser, function (err, _) {
        if (err) {
            logger.error(err)
            return err
        }
        logger.info("Successfuly saved")
        return null
    });
}

async function NewUserProfileUpdate(req) {
    //CreateNewUser({ name: "Nikolina Erceg", id: 4259098510786444, email: "nerceg@gmail.com" })

    let locId = await LocationController.AddUserLocation(req.body.location.longitude
        , req.body.location.latitude, req.query.id)

    const res = await UserModel.User.updateOne({ user_id: req.query.id }, {
        gender: req.body.gender, name: req.body.name, bio: req.body.bio,
        location_id: locId
    })
}

exports.GetUserByID = GetUserByID
exports.CreateNewUser = CreateNewUser
exports.NewUserProfileUpdate = NewUserProfileUpdate
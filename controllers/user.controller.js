const { Mongoose, mongo } = require('mongoose');
const logger = require('../logging/logger');
const UserModel = require('../models/user.model')
const LocationController = require('./location.controller')
const PreferenceController = require('../controllers/preference.controller')

//GetUserByID return the user if it exists or null if the user doesnt exist
async function GetUserByID(id) {
    let user = await UserModel.User.findOne({ user_id: id }).exec();
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
    try {
        const location_id = await LocationController.AddUserLocation(req.body.location, req.query.id);

        await PreferenceController.AddUserPreferences(req.query.id, req.body.preferences)

        await UserModel.User.updateOne({ user_id: req.query.id }, {
            gender: req.body.gender,
            name: req.body.name,
            bio: req.body.bio,
            location_id,
        }, function (err, res) {
            if (res.nModified == 0) return false //Todo delete the previous location
        });
        return true
    } catch (e) {
        logger.error(e)
        return false
    }
}


exports.GetUserByID = GetUserByID
exports.CreateNewUser = CreateNewUser
exports.NewUserProfileUpdate = NewUserProfileUpdate
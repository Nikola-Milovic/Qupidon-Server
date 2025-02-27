const mongoose = require('mongoose');
const LocationModel = require('../models/location.model')
const logger = require('../logging/logger');

//AddUserLocation returns id of the new location
async function AddUserLocation({ longitude, latitude }, user_id) {
    const location = { type: 'Point', coordinates: [longitude, latitude] };

    const loc = await LocationModel.create({ user_id, location });

    return loc._id;
}

async function GetUsersCloseToLocation(userID, distance) {
    let location = await LocationModel.findOne({ user_id: userID }).exec()
    let distToRadius = (distance * 1000) / 6378100 // distance/ earths equator is radians
    let result = await LocationModel.find()
        .where('location').within({
            center: [location.location.coordinates[0], location.location.coordinates[1]],
            radius: distToRadius, unique: true, spherical: true
        }).select(
            'user_id',
        )
    return result
}

exports.AddUserLocation = AddUserLocation
exports.GetUsersCloseToLocation = GetUsersCloseToLocation
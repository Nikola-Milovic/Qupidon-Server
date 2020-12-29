const db = require('mongoose');
const logger = require('../logging/logger');

//AddUserLocation returns id of the new location
async function AddUserLocation(longitude, latitude, userID) {
    let result = await db.connection.collection("locations").insertOne(
        { user_id: userID, loc: [longitude, latitude] })

    return result.insertedId
}



exports.AddUserLocation = AddUserLocation
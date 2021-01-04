const mongoose = require('mongoose');
const logger = require('../logging/logger');
const LocationController = require('./location.controller')
const PreferenceController = require('../controllers/preference.controller')
const UserController = require('../controllers/user.controller')

//Potentional matches

async function GetMatches(id) {
    console.log("GetMatches")
    const pref = await PreferenceController.FindUserPreferences(id)
    if (pref == null) {

    }

    const usersInRange = await LocationController.GetUsersCloseToLocation(id, pref.distance)

    var potentionalMatches = []

    for (const entry of usersInRange) {
        if (id == entry.user_id) {
            continue
        }
        const user = await UserController.GetUserByID(entry.user_id)
        if (checkIfMatch(pref, user)) {
            potentionalMatches.push(user.name)
        } else {
            console.log("Not a match " + user.name)
        }
    }

    console.log(potentionalMatches)
}

function checkIfMatch(pref, profile) {
    if (pref.gender == profile.gender) {
        return true
    }
    return false
}

exports.GetMatches = GetMatches
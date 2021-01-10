const mongoose = require('mongoose');
const logger = require('../logging/logger');
const LocationController = require('./location.controller')
const PreferenceController = require('../controllers/preference.controller')
const UserController = require('../controllers/user.controller')
const InteractionsController = require('../controllers/interactions.controller')

//Potentional matches

async function GetMatches(id) {
    const pref = await PreferenceController.FindUserPreferences(id)
    if (pref == null) {

    }
    const usersInRange = await LocationController.GetUsersCloseToLocation(id, pref.distance)

    var potentionalMatches = []

    for (const entry of usersInRange) { //TODO limit to some number
        if (id == entry.user_id) {
            continue
        }
        const user = await UserController.GetUserByID(entry.user_id)
        if (user == null) {
            console.log(entry.user_id)
        }
        const interacted = await InteractionsController.checkIfAlreadyInteracted(id, entry.user_id)
        if (!interacted && checkIfMatch(pref, user)) {
            potentionalMatches.push(user)
        }
    }

    return potentionalMatches
}

//CheckForMatch checks whether or not both users liked eachother
async function CheckForMatch(who_id, contains_id) {
    let interaction = await InteractionsController.GetInteractionsByID(who_id)
    if (interaction.liked.includes(contains_id)) {
        console.log("Match")
        return
    }
    return
}

//Checks whether or not two users are compatible
function checkIfMatch(pref, profile) {
    if (pref.gender == profile.gender) {
        return true
    }
    return false
}

exports.GetMatches = GetMatches
exports.CheckForMatch = CheckForMatch
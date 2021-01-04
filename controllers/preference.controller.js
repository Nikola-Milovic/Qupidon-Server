const mongoose = require('mongoose');
const PreferenceModel = require('../models/preferences.model')
const logger = require('../logging/logger');

//AddUserPreferences returns id of the new user preferences
async function AddUserPreferences(user_id, pref) {
    PreferenceModel.Preference.create({ user_id: user_id, gender: pref.gender, distance: pref.distance });
}

//Returns null or preferences
async function FindUserPreferences(id) {
    const pref = await PreferenceModel.Preference.findOne({ user_id: id })
    return pref
}

exports.AddUserPreferences = AddUserPreferences
exports.FindUserPreferences = FindUserPreferences
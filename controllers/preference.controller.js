const mongoose = require('mongoose');
const PreferenceModel = require('../models/preferences.model')
const logger = require('../logging/logger');

//AddUserPreferences returns id of the new user preferences
async function AddUserPreferences(user_id, pref) {
    PreferenceModel.Preference.create({ user_id: user_id, gender: pref.gender, distance: pref.distance });
}

exports.AddUserPreferences = AddUserPreferences
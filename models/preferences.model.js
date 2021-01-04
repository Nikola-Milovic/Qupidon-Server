const Joi = require('joi');
const mongoose = require('mongoose');

const preferenceSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    }, gender: {
        required: true,
        type: String,
        enum: ['male', 'female', 'other']
    }, distance: {
        type: Number,
        required: true
    }
});


const Preference = mongoose.model('Preference', preferenceSchema);

// function validateUser(user) {
//     const schema = {
//         name: Joi.string().min(5).max(50).required(),
//         email: Joi.string().min(5).max(255).required().email(),
//     };

//     return Joi.validate(user, schema);
// }

exports.Preference = Preference;
//exports.validate = validateUser;
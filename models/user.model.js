const Joi = require('joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    }, name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
    }, bio: {
        type: String,
        minlength: 10,
        maxlength: 140
    }, gender: {
        type: String,
        enum: ['male', 'female', 'other']
    }, location_id: {
        type: mongoose.Types.ObjectId,
        ref: 'locations'
    }, profile_picture: {
        type: String
    }
});


const User = mongoose.model('User', userSchema);

// function validateUser(user) {
//     const schema = {
//         name: Joi.string().min(5).max(50).required(),
//         email: Joi.string().min(5).max(255).required().email(),
//     };

//     return Joi.validate(user, schema);
// }

exports.User = User;
//exports.validate = validateUser;
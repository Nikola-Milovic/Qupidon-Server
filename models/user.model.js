const Joi = require('joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userID: {
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
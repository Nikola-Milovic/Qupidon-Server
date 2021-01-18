var mongoose = require("mongoose");
var Schema = mongoose.Schema;


const pointSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Point'],
        required: true
    },
    coordinates: {
        type: [Number],
        required: true
    }
});

var LocationSchema = new Schema({
    location: {
        type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'], // 'location.type' must be 'Point'
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    user_id: {
        type: String,
        required: true,
        unique : true
    }
});


LocationSchema.index({ location: '2dsphere' });

module.exports = mongoose.model("Location", LocationSchema);
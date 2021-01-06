var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var InteractionsSchema = new Schema({
    liked: {
        type: [String],
        default: []
    },
    rejected: {
        type: [String],
        default: []
    },
    user_id: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Interactions", InteractionsSchema);
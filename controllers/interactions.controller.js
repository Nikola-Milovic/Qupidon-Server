const logger = require('../logging/logger');
const InteractionsModel = require('../models/interactions.model')


async function LikeUser(who_id, liked_id) {
    console.log("like user")
    InteractionsModel.updateOne({ user_id: who_id }, {
        $push: { liked: liked_id }
    }, function (err, res) {
    });
}

async function RejectUser(who_id, reject_id) {
    InteractionsModel.updateOne({ user_id: who_id }, {
        $push: { rejected: reject_id }
    }, function (err, res) {
    });
}

exports.LikeUser = LikeUser
exports.RejectUser = RejectUser
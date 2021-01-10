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

async function checkIfAlreadyInteracted(who_id, with_who_id) {
    const interactions = await InteractionsModel.findOne({ user_id: who_id })

    let liked = false
    let rejected = false

    if (interactions.liked.includes(with_who_id)) {
        liked = true
    }

    if (interactions.rejected.includes(with_who_id)) {
        rejected = true
    }

    return liked || rejected
}

async function GetInteractionsByID(id) {
    const interactions = await InteractionsModel.findOne({ user_id: id })
    return interactions
}


exports.LikeUser = LikeUser
exports.RejectUser = RejectUser
exports.checkIfAlreadyInteracted = checkIfAlreadyInteracted
exports.GetInteractionsByID = GetInteractionsByID
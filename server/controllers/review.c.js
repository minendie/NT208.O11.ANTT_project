const review = require('../models/review.m')

module.exports = {
    writeReview: async (req, res) => {
        if (!req.body.userID) {
            res.send({
                success: false,
                message: 'Only registered users can write review',
            })
            return;
        }
        review.createReview(req.body) // campaignID, userID, rating, comment
                .then((result) => res.send({success: true}))
                .catch(err => {
                    console.log(err)
                    res.send({
                        success: false,
                        message: err.message,
                    }
                )})
    },

    getReviewsByCampaignID: async (req, res) => {
        review.readReviewsByCampaignID(req.params.campaignId)
                .then((result) => res.send(JSON.stringify(result)))
                .catch(err => res.send({
                    message: err.message,
                }))
    }
}
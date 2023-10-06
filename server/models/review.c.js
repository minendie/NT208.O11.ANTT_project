const review = require('../models/review.m')

module.exports = {
    writeReview: async (req, res) => {
        review.createReview(req.body) // campaignID, userID, rating, comment
                .then((result) => res.send({success: true}))
    },

    getReviewsByCampaignID: async (req, res) => {
        review.readReviewsByCampaignID(req.params.campaignId)
    }
}
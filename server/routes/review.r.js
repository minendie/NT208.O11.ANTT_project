const ControllerReview = require('../controllers/review.c');

const router = app => {
    
    // write review
    app.post('/write-review', ControllerReview.writeReview)

    // get review of a campaign based on its ID
    app.get('/get-reviews/:campaignId', ControllerReview.getReviewsByCampaignID)

};

module.exports = router;
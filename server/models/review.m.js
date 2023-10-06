const db = require('../config/connectDB')

module.exports = {
    // write a review into database
    createReview: async(reviewData) => {
        try {
            const result = await db.Query(`
                INSERT INTO Review (UserID, CampaignID, Rating, Comment)
                SELECT * 
                FROM (
                    ${reviewData.userID} AS UserID, 
                    ${reviewData.campaignID} AS CampaignID, 
                    ${reviewData.rating} AS Rating, 
                    '${reviewData.comment}' AS Comment
                ) AS temp
                WHERE NOT EXISTS (
                    SELECT 1 FROM Review
                    WHERE userID = ${reviewData.userID} AND campaignID = ${reviewData.campaignID}
                );
            `);
        
            if (result.affectedRows === 0) {
                throw new Error('A review already exists for this user and campaign.');
            }
        } catch (err) {
            console.log(error);
            throw error; // Throw the error to be caught by the caller
        }
    },

    // select reviews by the campaign's ID
    readReviewsByCampaignID: async(campaignID) => {
        try {
            const reviews = await db.Query(`
                SELECT 
                    Username,
                    Comment,
                    Rating
                FROM User JOIN Review ON User.UserID = Review.UserID
                WHERE CampaignID = ${campaignID}
            `)
            return reviews;
        } catch (err) {
            console.log(error);
            throw error; // Throw the error to be caught by the caller
        }
    },
} 
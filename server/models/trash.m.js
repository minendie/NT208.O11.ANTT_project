const db = require('../config/connectDB')


function formatDate(dateString) {
    const date = new Date(dateString);

    const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    return formattedDate;
}


module.exports = {
    getTrashInfoByID: async (id) => {
        try {
            const result = await db.Query(
                `SELECT description FROM Item WHERE ItemID='${id}'`
            );
            return result; // Return the result here
        } catch (error) {
            console.log(error);
            throw error; // Throw the error to be caught by the caller
        }
    },

    getTrashLocationsByID: async (id) => {
        try {
            var result = await db.Query( //'SELECT * FROM Recycling'
                `
                SELECT 
                    C.CampaignID, 
                    CampaignName,
                    StartDate,
                    EndDate,
                    C.Description,
                    CONCAT(Street, ', ', Ward, ', ', Province, ', ', Country) AS Address,
                    CONCAT(OpenHour, ' to ', CloseHour) AS WorkingHour
                FROM 
                    Campaign C 
                        JOIN Recycling R ON C.CampaignID = R.CampaignID
                        JOIN Item I ON R.ItemID = I.ItemID
                WHERE 
                    R.ItemID='${id}'
                `
            );
            // format the start and end date 
            console.log(result)
            if (result.length) {
                result.forEach((campaign) => {
                    campaign['StartDate'] = formatDate(campaign['StartDate'])
                    campaign['EndDate'] = formatDate(campaign['EndDate'])
                })
            }
            return result; // Return the result 
        } catch (error) {
            console.log(error);
            throw error; // Throw the error to be caught by the caller
        }
    },

    getAllTrash: async () => {
        try {
            var result = await db.Query( //'SELECT * FROM Recycling'
                `
                SELECT 
                    ItemID, ItemName
                FROM 
                    Item
                `
            );
            return result; // Return the result 
        } catch (error) {
            console.log(error);
            throw error; // Throw the error to be caught by the caller
        }
    },

    getTrashNameByCampaignID: async(campaignID) => {
        try {
            var result = await db.Query( //'SELECT * FROM Recycling'
                `
                SELECT 
                    ItemName
                FROM 
                    Item JOIN Recycling ON Item.ItemID = Recycling.ItemID
                WHERE campaignID = ${campaignID}
                `
            );
            return result; // Return the result 
        } catch (error) {
            console.log(error);
            throw error; // Throw the error to be caught by the caller
        }
    },

    postNewTrash: async (trashName) => {
        try {
            const result = await db.Query(`
                INSERT INTO Item (ItemName)
                VALUES ('${trashName}')
            `)
            return result.insertId;
        } catch (err) {
            console.log(err);
            throw err;
        }
    },
}
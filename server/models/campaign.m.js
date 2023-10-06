const db = require('../config/connectDB')


module.exports = {

    // create a new campaign // dang cho doi lai DB 
    createCampaign: async(campaignData) => {
        try {
            const result = await db.Query(`
                INSERT INTO Campaign (CampaignName, StartDate, EndDate, Street, Ward, District, Province, Country, Lat, Long, Description, Status, OpenHour, CloseHour)
                VALUES ('${campaignData.campaignName}', 
                        '${campaignData.startDate}', 
                        '${campaignData.endDate}', 
                        '${campaignData.street}', 
                        '${campaignData.ward}', 
                        '${campaignData.district}', 
                        '${campaignData.province}', 
                        '${campaignData.country}',
                        ${campaignData.lat},
                        ${campaignData.long},
                        '${campaignData.description}',
                        ${campaignData.status},
                        '${campaignData.openHour}',
                        '${campaignData.closeHour}')
                `) /// them lat, lon nua
                .then((result => {
                    console.log(result);
                }))
        } catch (err) {
            console.log(err);
            throw err;
        }
    },

    // edit a campaign
    updateCampaign: async(campaignData) => {
        try {
            const result = db.Query(`
                UPDATE Campaign
                SET 
                    CampaignName = ${typeof campaignData.campaignName === 'undefined' ? 'CampaignName' : `'${campaignData.campaignName}'`},
                    StartDate    = ${typeof campaignData.startDate === 'undefined' ? 'StartDate' : `'${campaignData.startDate}'`},
                    EndDate      = ${typeof campaignData.endDate === 'undefined' ? 'EndDate' : `'${campaignData.endDate}'`},
                    Street       = ${typeof campaignData.street === 'undefined' ? 'Street' : `'${campaignData.street}'`},
                    Ward         = ${typeof campaignData.ward === 'undefined' ? 'Ward' : `'${campaignData.ward}'`},
                    District     = ${typeof campaignData.district === 'undefined' ? 'District' : `'${campaignData.district}'`},
                    Province     = ${typeof campaignData.province === 'undefined' ? 'Province' : `'${campaignData.province}'`},
                    Country      = ${typeof campaignData.country === 'undefined' ? 'Country' : `'${campaignData.country}'`},
                    Lat          = ${typeof campaignData.lat === 'undefined' ? 'Lat' : campaignData.lat},
                    Long         = ${typeof campaignData.country === 'undefined' ? 'Long' : campaignData.long},
                    Description  = ${typeof campaignData.description === 'undefined' ? 'Description' : `'${campaignData.description}'`},
                    Status       = ${typeof campaignData.status === 'undefined' ? 'Status' : campaignData.status},
                    OpenHour     = ${typeof campaignData.openHour === 'undefined' ? 'OpenHour' : `'${campaignData.openHour}'`},
                    CloseHour    = ${typeof campaignData.closeHour === 'undefined' ? 'CloseHour' : `'${campaignData.closeHour}'`}
                WHERE CampaignID = ${campaignData.campaignID};
            `).then((result) => {
                console.log(result);
            })
        } catch (err) {
            console.log(err);
            throw err;
        }
    },

    // delete a campaign 
    deleteCampaign: async(campaignID) => {
        try {
            const result = await db.Query(`
                DELETE FROM Campaign WHERE CampaignID = ${campaignID}
            `).then((result) => console.log(result))
        } catch (err) {
            console.log(err)
            throw err;
        }
    },

    // read all campaigns
    getAllCampaigns: async() => {
        try {
            const results = await db.Query('SELECT * FROM Campaign')
            return results;
        } catch (err) {
            console.log(err);
            throw err;
        }
    },

    // search campaign by id 
    getCampaignByID: async(campaignID) => {
        try {
            const results = await db.Query(`SELECT * FROM Campaign WHERE CampaignID = ${campaignID}`)
            return results;
        } catch (err) {
            console.log(err);
            throw err;
        }
    },

    // search campaign by city and is active or upcoming
    getCampaignByCity: async(city) => {
        try {
            const results = await db.Query(`SELECT * FROM Campaign WHERE Province = ${city}`)
            return results;
        } catch (err) {
            console.log(err);
            throw err;
        }
    },

    // search campaign by distance // wait for latitude and longtitude
    getCampaignByDistance: async (targetedLattitude, targetedLongtitude, startDate, endDate) => {
        try {
            const results = await db.Query(`
                SELECT * FROM Campaign WHERE Province = ${city}
            `)
            return results;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

}
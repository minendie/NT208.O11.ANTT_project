const { type } = require('os');
const campaign = require('../models/campaign.m')
const trash = require('../models/trash.m');
const user = require('../models/user.m');


module.exports = {
    searchCampaign: async (req, res) => {
        try {
            const {targetLat, targetLong, startDate, endDate} = req.body;
            if (!targetLat || !targetLong) {
                var campaigns = await campaign.getCampaignsByDateRange(startDate, endDate)
                var campaignInfos = await Promise.all(
                    campaigns.map(async (c) => {
                        const [result] = await campaign.getCampaignByID(c.campaignID);
                        const receiveItems = await trash.getTrashNameByCampaignID(result.campaignID)
                        result.receiveItems = receiveItems.map((val, ) => val['ItemName']);
                        return result;
                    })
                );
                res.send({
                    success: true,
                    campaigns: JSON.stringify(campaignInfos)
                })
                return;
            }

            var campaigns = await campaign.getCampaignsByDistance(
                                                targetLat, 
                                                targetLong, 
                                                startDate, 
                                                endDate);
            var campaignInfos = await Promise.all(
                campaigns.map(async (c) => {
                    const [result] = await campaign.getCampaignByID(c.campaignID);
                    const receiveItems = await trash.getTrashNameByCampaignID(result.campaignID)
                    result.receiveItems = receiveItems.map((val, ) => val['ItemName']);
                    return result;
                })
            );
            res.send({
                success: true,
                campaigns: JSON.stringify(campaignInfos)
            })
        } catch (err) {
            res.send({
                success: false,
                message: err.message,
            })
        }
    },

    searchCampaignByID: async (req, res) => {
        try {
            var [result] = await campaign.getCampaignByID(req.params.id)
            if (!result) {
                res.send({
                    success: false,
                    message: 'Invalid campaign ID'
                });
                return;
            }

            const receiveItems = await trash.getTrashNameByCampaignID(result.campaignID)
            result.receiveItems = receiveItems.map((val, ) => val['ItemName']);
            res.send({
                success: true,
                result: JSON.stringify(result)
            })
            return result;
        }
        catch (err) {
            res.send({
                success: false,
                message: err.message,
            })
        }
    },

    // read all campaigns
    readAll: async (req, res) => {
        try {
            var results = await campaign.getAllCampaigns();
    
            var processedResults = await Promise.all(
                results.map(async (result, index) => {
                    const receiveItems = await trash.getTrashNameByCampaignID(result.campaignID)
                    result.receiveItems = receiveItems.map((val, ) => val['ItemName']);
                    const [description, receiveGifts] = result.description.split('\n Gifts: ')
                    result = {
                        ...result,
                        description, receiveGifts
                    }
                    return result;
                })
            );
    
            res.send(JSON.stringify(processedResults))
        }
        catch (err) {
            res.send({message: err.message})
        }
    },

    // create a new campaign
    createCampaign: async (req, res) => {
        try {
            // preprocess 
            // {startDate, endDate, description, campaignName, openHour, closeHour, address, receiveItems}
            var campaignData = {...req.body};
            // start day < end day
            // Check if startDate is less than endDate
            const today = new Date();
            const start = new Date(campaignData.startDate);
            const end = new Date(campaignData.endDate);
    
            if (start > end) {
                res.send({ success: false, message: 'Start date must be less than end date' });
                return;
            }

            // check name
            campaignData['campaignName'] = campaignData['campaignName'].trim().replace("'", "''");
            if (campaignData['campaignName'] && campaignData['campaignName'].length < 1) {
                res.send({
                    success: false,
                    message: 'Name must be filled',
                })
                return;
            }

            if (!campaignData['lat'] || !campaignData['long']) {
                res.send({
                    success: false,
                    message: 'Must have lattitude and longtitude',
                });
                return;
            }
    
            // set status
            campaignData['status'] = start > today ? 2 : (end < today ? 0 : 1)
            const itemsInCampaign = await Promise.all(campaignData.receiveItems.map(async(val) => {
                if (typeof val == 'string') {
                    const trashID = await trash.postNewTrash(val);
                    return trashID;
                }
                return val;
            }));

            const campaignID = campaign.createCampaign(campaignData)
                    .then(campaignID => {
                        campaign.createCampaignItem(campaignID, itemsInCampaign)
                                .then(() => {
                                    res.send({
                                        success: true
                                    })
                                })
                                .catch(err => res.send({message: err.message}));
                        user.createOrganizerCampaign(campaignID, campaignData['organizerID']);
                    })
                    .catch(err => {
                        res.send({message: err.message})
                    })

        } catch (err) {
            res.send({
                success: false,
                message: err.message,
            })
        }
    },

    // edit campaign
    editCampaign: async (req, res) => {
        const campaignData = {...req.body};

        campaign.updateCampaign(campaignData)
                .then(result => res.send({success: true}))
                .catch(err => res.send({message: err.message}))
    },

    // delete a campaign
    deleteCampaign: async (req, res) => {
        // TODO: check if the request comes from the organizer of the campaign 
        campaign.deleteCampaign(req.body.campaignID)
                .then(result => res.send({success: true}))
                .catch(err => res.send({message: err.message}))
    },
}
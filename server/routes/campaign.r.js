const ControllerCampaign = require('../controllers/campaign.c')


const router = app => {
    // search for a campaign
    app.get('/search', ControllerCampaign.searchCampaign);

    app.get('/campaign/:id', ControllerCampaign.searchCampaignByID);

    // read all campaigns
    app.get('/campaign/all', ControllerCampaign.readAll);

    // create a new campaign
    app.post('/create-campaign', ControllerCampaign.createCampaign);

    // edit campaign
    app.put('/edit-campaign', ControllerCampaign.editCampaign)

    // delete a campaign
    app.delete('/delete-campaign', ControllerCampaign.deleteCampaign);
}   

// export the router
module.exports = router;

const ControllerTrash = require('../controllers/trash.c');


const router = app => {

    // get review of a campaign based on its ID
    app.get('/trash/all', ControllerTrash.getAllTrash)
};

module.exports = router;
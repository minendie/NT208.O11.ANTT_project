const ControllerUser = require('../controllers/user.c');

const router = app => {
    // get User by Username
    app.get('/users/:username', ControllerUser.participantGet);

}


// export the router
module.exports = router;

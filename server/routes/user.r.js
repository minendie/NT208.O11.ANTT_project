const ControllerUser = require('../controllers/user.c')

const router = app => {
    // login
    app.post('/auth/login', ControllerUser.logIn);
    // sign up 
    app.post('/auth/signup', ControllerUser.signUp);
    // check organizer
    app.get('/is-organizer/:userID', ControllerUser.authenOrganizer);
}

module.exports = router;
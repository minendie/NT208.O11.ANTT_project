const ControllerUser = require('../controllers/user.c')

const router = app => {
    // login
    app.post('/auth/login', ControllerUser.logIn);
    // sign up 
    app.post('/auth/signup', ControllerUser.signUp);
}

module.exports = router;
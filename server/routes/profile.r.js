const ControllerUser = require('../controllers/user.c');
const AuthMiddleware = require('../middleware/auth.middleware')


const router = app => {
    // get User by Username
    app.get('/users/:username', ControllerUser.userGet);
    // upload user's data
    // app.put('/edit/:userID', AuthMiddleware.authenToken, ControllerUser.userUpdate);
}   

// export the router
module.exports = router;

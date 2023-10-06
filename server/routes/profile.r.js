const ControllerUser = require('../controllers/user.c');
const AuthMiddleware = require('../middleware/auth.middleware')


const router = app => {
    // RU User
    app.get('/users/:username', ControllerUser.userGet);
    app.put('/update-user', ControllerUser.userPut);
    // CRU User
    app.post('/create-organizer', ControllerUser.organizerPost);
    app.get('/organizer/:organizerID', ControllerUser.organizerGet);
    app.put('/update-organizer', ControllerUser.organizerPut);
}   


// export the router
module.exports = router;

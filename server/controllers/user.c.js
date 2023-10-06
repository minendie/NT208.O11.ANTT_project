const user = require('../models/user.m')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const fs = require('fs'); // read files


module.exports = {

    // sign up a new user
    signUp: async (req, res) => {
        const username = `${req.body.username.trim()}`
        const password = `${req.body.password.trim()}`
        const email = req.body.email
        // validate password and username length
        if (password.length < 8
            || username.length < 5
            || password.length >= 50
            || username.length >= 50) {
            res.send({
                success: false,
                message: 'Password and Username must be bigger than 8 and smaller than 50 characters (not containing whitespaces)'
            })
            return
        }

        user.createUser(username, email, password)
            .then((result) => {
                res.send({
                    success: true,
                });
            })
            .catch((err) => {
                console.log(err);
                res.send({
                    success: false,
                    message: err.message,
                });
            })
    },

    // log in
    logIn: async (req, res) => {
        const username = `${req.body.username.trim()}`
        const password = `${req.body.password.trim()}`

        // validate password and username length
        if (password.length < 3 || username.length < 5) {
            res.send({
                success: false,
                message: 'Password must have more than 3 characters and username must have more than 5 characters and smaller than 50 (not containing whitespaces)'
            })
            return
        }

        user.authenUser(username, password)
            .then(({isAuthen, userID='None', username='None',}) => {
                console.log('Server response')
                if (isAuthen) {
                    const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
                    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

                    const dataForAccessToken = {
                        userID: userID,
                        username: username,
                    };

                    const accessToken = jwt.sign(dataForAccessToken, accessTokenSecret, {
                        expiresIn: accessTokenLife,
                      });

                    res.send({
                        // JWT Token
                        accessToken,
                        success: true,
                    })
                }
                else {
                    res.send({
                        success: false,
                        message: 'Invalid password or username'
                    })
                }
            })
            .catch((err) => {
                console.log(err);
                res.send({
                    success: false,
                    message: err.message,
                })
            })
    },

    // get information of a participant
    userGet: async (req, res) => {
        // if authorized => return all
        user.getUserByUsername(req.params.username) // create a Promise to database
            .then((result) => {
                if (result.length < 1) {
                    res.send([]);
                    return;
                }
                const processedResult = [{
                    Username: result[0]['Username'],
                    Email: result[0]['Email'],
                    PhoneNumber: result[0]['PhoneNumber'],
                    Bio: result[0]['Bio'],
                    Address: result[0]['Street'] ? `${result[0]['Street']}, ${result[0]['Ward']}, ${result[0]['District']}, ${result[0]['Province']}, ${result[0]['Country']}}` : null,
                }]
                res.send(JSON.stringify(processedResult))
            })
            .catch((err) => {
                console.log(err);
                res.send({
                    success: false,
                    message: err.message,
                })
            });
    },

    // update user
    userPut: async (req, res) => {
        user.updateUser(req.body)
            .then((result) => {
                res.send({
                    success: true,
                })
            })
            .catch((err) => {
                console.log(err)
                res.send({
                    success: false,
                    message: err.message,
                })
            })
    },

    // get information of an organizer
    organizerGet: async (req, res) => {
        user.readOrganizerByOrganizerID(req.params.organizerID)
            .then((result) => {
                if (result.length < 1) {
                    res.send([]);
                    return;
                }
                const processedResult = [{
                    Name: result[0]['Name'],
                    Email: result[0]['Email'],
                    PhoneNumber: result[0]['PhoneNumber'],
                    Description: result[0]['Description'],
                    Website: result[0]['Website'],
                    FB_Link: result[0]['FB_Link'],
                    LinkedIn_Link: result[0]['LinkedIn_Link'],
                    UserID: result[0]['UserID'],
                }]
                res.send(JSON.stringify(processedResult))
            })
            .catch((err) => {
                console.log(err);
                res.send({
                    success: false,
                    message: err.message,
                })
            })
    },

    // create a new organizer
    organizerPost: async (req, res) => {
        // deny post if the body data does not contain name
        var organizerData = {...req.body};
        if (typeof organizerData.name === 'undefined' || organizerData.name === '') {
            res.send({
                success: false,
                message: 'Organizer\'s name is compulsory',
            })
            return;
        }

        // deny post if there's no userID
        if (typeof req.body.userID === 'undefined' || req.body.userID === '') {
            res.send({
                success: false,
                message: 'Only registered user of our web can become an organizer',
            })
            return;
        }

        organizerData['userID'] = parseInt(organizerData['userID']);
        if (isNaN(organizerData.userID)) {
            res.send({
                success: false,
                message: 'Invalid user.'
            })
            return;
        }

        user.createOrganizer(req.body)
            .then((result) => {
                res.send({
                    success: true,
                })
            })
            .catch((err) => {
                console.log(err)
                res.send({
                    success: false,
                    message: err.message,
                })
            })
    },

    // update organizer
    organizerPut: async (req, res) => {
        // deny put if the body data does not contain name
        var organizerData = {...req.body};
        if (typeof organizerData.name === 'undefined' || organizerData.name === '') {
            res.send({
                success: false,
                message: 'Organizer\'s name is compulsory',
            })
            return;
        }

        user.updateOrganizer(organizerData)
            .then((result) => {
                res.send({
                    success: true,
                })
            })
            .catch((err) => {
                console.log(err)
                res.send({
                    success: false,
                    message: err.message,
                })
            })
    }

}
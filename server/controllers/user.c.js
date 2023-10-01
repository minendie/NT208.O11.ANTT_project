const user = require('../models/user.m')
require('dotenv').config()
const jwt = require('jsonwebtoken')


module.exports = {

    // sign up a new user
    signUp: async (req, res) => {
        const username = `${req.body.username.trim()}`
        const password = `${req.body.password.trim()}`
        const email = req.body.email
        // validate password and username length
        if (password.length < 8 || username.length < 8) {
            res.status(401).send({
                success: false,
                message: 'Password and Username must be bigger than 8 (not containing whitespaces)'
            })
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
        if (password.length < 8 || username.length < 8) {
            res.status(401).send({
                success: false,
                message: 'Password and Username must be bigger than 8 (not containing whitespaces)'
            })
        }

        user.authenUser(username, password)
            .then(({isAuthen, userID='None'}) => {
                if (isAuthen) {
                    const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
                    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

                    const dataForAccessToken = {
                        userID: userID,
                    };

                    const accessToken = jwt.sign(dataForAccessToken, accessTokenSecret, {
                        expiresIn: accessTokenLife,
                      });
                      
                    // if (!accessToken) {
                    //     return res
                    //         .status(401)
                    //         .send('Đăng nhập không thành công, vui lòng thử lại.');
                    // }

                    // let refreshToken = randToken.generate(jwtVariable.refreshTokenSize); // tạo 1 refresh token ngẫu nhiên
                    // if (!user.refreshToken) {
                    //     // Nếu user này chưa có refresh token thì lưu refresh token đó vào database
                    //     await userModel.updateRefreshToken(user.username, refreshToken);
                    // } else {
                    //     // Nếu user này đã có refresh token thì lấy refresh token đó từ database
                    //     refreshToken = user.refreshToken;
                    // }

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
                    message: err,
                })
            })
    },

    userGet: async (req, res) => {
        user.getUserByUsername(req.params.username) // create a Promise to database
            .then((result) => {
                res.send(JSON.stringify(result))
            })
            .catch((err) => {
                console.log(err);
            });
    }

}
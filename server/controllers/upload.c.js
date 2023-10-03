'use strict';
const upload = require('../models/ModelMulter');  // middleware multer to upload images
const ControllerAITool = require('../controllers/ai_tools.c');


module.exports = {

    uploadSingleFile: async(req, res) => {
        try {
            // upload image
            upload(req, res, (err) => {
                if (!err) { // upload success
                    console.log(`POST upload ${req.file.filename} successfully`)
                    // perform predictions
                    ControllerAITool.performPredictions(req.file.filename)
                        .then((result) => {
                            res.send(result);
                        })
                        .catch((error) => {
                            console.log(error);
                            res.sendStatus(500);
                        });
                } else { 
                    console.log('Cannot POST')
                    throw err
                }
            });
        } catch (err) {
            console.log(err);
            res.sendStatus(500);
        }
    },

}
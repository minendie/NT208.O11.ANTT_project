'use strict';
const upload = require('../models/ModelMulter');  // middleware multer to upload images
const ControllerAITool = require('../controllers/ai_tools.c');
const path = require('path')
const fs = require('fs'); // read files
 


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
            res.status(500).send({message: err.message});
        }
    },

    deleteUploadedFile: async(req, res) => {
        try {
            const imagePath = path.join(__dirname, '../public/images/', req.params.filename)
            fs.unlink(imagePath, (unlinkErr) => {
                if (unlinkErr) {
                  console.error(unlinkErr);
                  return;
                }
                console.log(`Image ${imagePath} has been sent and deleted.`);
            });
            res.send({success: true})
        } catch (err) {
             console.log(err)
        }
    }

}
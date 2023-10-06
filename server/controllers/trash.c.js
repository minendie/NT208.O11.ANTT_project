const trash = require('../models/trash.m')

module.exports = {
    getAllTrash: async (req, res) => {
        trash.getAllTrash()
             .then((result) => res.send(JSON.stringify(result)))
             .catch((err) => res.send({message: err.message}))
    },

    postNewTrash: async (req, res) => {
        
    },
}
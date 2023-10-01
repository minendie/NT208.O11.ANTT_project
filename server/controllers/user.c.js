const participant = require('../models/participant.m')

module.exports = {

    participantGet: async (req, res) => {
        participant.getUserByUsername(req.params.username) // create a Promise to database
            .then((result) => {
                res.send(JSON.stringify(result))
            })
            .catch((err) => {
                console.log(err);
            });
    }

}
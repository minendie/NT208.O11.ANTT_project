const db = require('../config/connectDB')


module.exports = {
    getUserByUsername: async (Username) => {
        try {
            console.log(Username);
            const result = await db.Query(`SELECT * FROM User WHERE Username='${Username}'`);
            return result; // Return the result here
        } catch (error) {
            console.log(error);
            throw error; // Throw the error to be caught by the caller
        }
    },
}
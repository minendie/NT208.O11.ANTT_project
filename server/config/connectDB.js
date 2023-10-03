const mysql = require('mysql2'); // database
const fs = require('fs'); // read file

require('dotenv').config() // enable process.env

// config database connection
var config =
{
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    ssl:  {
        ca: fs.readFileSync(`${__dirname}/DigiCertGlobalRootG2.crt.pem`),
        rejectUnauthorized: false // trust the self-assigned cert
    },
    connectionLimit: 30, // Set the connection pool size
};


const pool = mysql.createPool(config).promise(); // create a pool for our app


module.exports = {
    Query: async (query) => {
        try {
            const connection = await pool.getConnection((err, conn) => {
                if (err) {
                    console.log("!!! Cannot get connection from the pool !!! Error:");
                    throw err;
                } else {
                    console.log("Connection retrieved from the pool.");
                }
            });
            const [rows] = await connection.query(query);
            connection.release();
            return rows;
        } catch (error) {
            console.log(error);
            throw err;
        }
    },
}

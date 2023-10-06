const db = require('../config/connectDB')
const bcrypt = require('bcrypt');

// CONFIG SPACE
const saltRounds = 10

 
module.exports = {
    // retrieve user from the database 
    getUserByUsername: async (username) => {
        try {
            console.log(username); 
            const result = await db.Query(`
                SELECT 
                    Username, Email, PhoneNumber, Bio,
                    Street, Ward, District, Province, Country
                FROM User 
                WHERE username='${username}'
            `);
            return result; // Return the result here
        } catch (error) {
            console.log(error);
            throw error; // Throw the error to be caught by the caller
        } /// )
    },
 
    // edit user
    updateUser: async (userData) => {
        try {
            const encryptedPassword = (typeof userData.password === 'undefined' || userData.password === '') 
                                        ? null 
                                        : await bcrypt.hashSync(userData.password, saltRounds);
            const result = db.Query(`
                UPDATE User
                SET 
                    Password     = ${!encryptedPassword ? 'Password' : `'${encryptedPassword}'`},
                    PhoneNumber  = ${(typeof userData.phoneNumber === 'undefined' || userData.phoneNumber === '') ? 'PhoneNumber' : `'${userData.phoneNumber}'`},
                    Street       = ${(typeof userData.street === 'undefined' || userData.street === '') ? 'Street' : `'${userData.street}'`},
                    Ward         = ${(typeof userData.ward === 'undefined' || userData.ward === '') ? 'Ward' : `'${userData.ward}'`},
                    District     = ${(typeof userData.district === 'undefined' || userData.district === '') ? 'District' : `'${userData.district}'`},
                    Province     = ${(typeof userData.province === 'undefined' || userData.province === '') ? 'Province' : `'${userData.province}'`},
                    Country      = ${(typeof userData.country === 'undefined' || userData.country === '') ? 'Country' : `'${userData.country}'`},
                    Bio          = ${(typeof userData.bio === 'undefined' || userData.bio === '') ? 'Bio' : `'${userData.bio}'`}
                WHERE UserID = ${userData.userID};
            `).then((result) => {
                console.log(result);
            })
        } catch (err) {
            console.log(err);
            throw err;
        }
    },

    // create a new user
    createUser: async (username, email, password) => {
        try {
            // Encrypt user password
            console.log(username, email, password)
            const encryptedPassword = await bcrypt.hashSync(password, saltRounds)
            const insertInfo = await db.Query(`
                INSERT INTO User (username, email, password)
                SELECT
                    *
                FROM (SELECT 
                        '${username}' AS username, 
                        '${email}' AS email , 
                        '${encryptedPassword}' AS password
                ) AS tmp
                WHERE NOT EXISTS (
                    SELECT 1 FROM User
                    WHERE username = '${username}' OR email = '${email}'
                );
            `)            
            if(!insertInfo.insertId) {// don't allow users create new account
                throw new Error('User already exists.')
            }
            return true;
        } catch (err) {
            throw err;
        }
    },

    // authen 
    authenUser: async (username, password) => {
        try {
            //Encrypt user password
            const userInfo = await db.Query(`
                	SELECT UserID, Username, Password
                    FROM User
                    WHERE username='${username}'
                    LIMIT 1
            `)
            if (userInfo.length) { // has a matching
                if (bcrypt.compareSync(password, userInfo[0]['Password'])) {
                    return {
                        userID: userInfo[0]['UserID'],
                        username: userInfo[0]['Username'],
                        isAuthen: true,
                    };
                }
                else {
                    throw new Error ('Wrong password');
                }
            }
            return {
                isAuthen: false,
            };
            

        } catch (err) {
            console.log(err);
            throw err;
        }
    },
    
    // create 
    createOrganizer: async (organizerData) => {
        try {
            const insertInfo = await db.Query(`
                INSERT INTO Organizer (UserID, Name, Email, Website, FB_Link, LinkedIn_Link, PhoneNumber, Description)
                SELECT
                    *
                FROM (SELECT 
                    ${organizerData.userID} AS UserID, 
                    '${organizerData.name}' AS Name, 
                    ${organizerData.email ? `'${organizerData.email}'` : 'NULL'} AS Email,
                    ${organizerData.website ? `'${organizerData.website}'` : 'NULL'} AS Website,
                    ${organizerData.fb_Link ? `'${organizerData.fb_Link}'` : 'NULL'} AS FB_Link,
                    ${organizerData.linkedIn_Link ? `'${organizerData.linkedIn_Link}'` : 'NULL'} AS LinkedIn_Link,
                    ${organizerData.phoneNumber ? `'${organizerData.phoneNumber}'` : 'NULL'} AS PhoneNumber,
                    ${organizerData.description ? `'${organizerData.description}'` : 'NULL'} AS Description
                ) AS tmp
                WHERE NOT EXISTS (
                    SELECT 1 FROM Organizer
                    WHERE UserID = ${organizerData.userID}
                );

            `)
            if (!insertInfo.insertId) {
                throw new Error('This is an organizer already. Each user can become one organizer only.')
            }
            
            return true;
        } catch (err) { 
            console.log(err);
            throw err;
        }
    },

    readOrganizerByOrganizerID: async (organizerID) => {
        try {
            const result = await db.Query(`
                SELECT 
                    UserID, Name, Email, Website, FB_Link, LinkedIn_Link, PhoneNumber, Description
                FROM Organizer
                WHERE OrganizerID='${organizerID}'
            `);
            return result; // Return the result here
        } catch (error) {
            console.log(error);
            throw error; // Throw the error to be caught by the caller
        };
    },
    
    // update organizer 
    updateOrganizer: async (organizerData) => {
        try {
            const result = db.Query(`
                UPDATE Organizer
                SET 
                    Name         = ${(typeof organizerData.name === 'undefined' || organizerData.name === '') ? 'Name' : `'${organizerData.orgName}'`},
                    Email        = ${(typeof organizerData.email === 'undefined' || organizerData.email === '') ? 'Email' : `'${organizerData.email}'`},
                    Website      = ${(typeof organizerData.website === 'undefined' || organizerData.website === '') ? 'Website' : `'${organizerData.website}'`},
                    FB_Link      = ${(typeof organizerData.fb_Link === 'undefined' || organizerData.fb_Link === '') ? 'FB_Link' : `'${organizerData.fb_Link}'`},
                    LinkedIn_Link= ${(typeof organizerData.linkedIn_Link === 'undefined' || organizerData.linkedIn_Link === '') ? 'LinkedIn_Link' : `'${organizerData.linkedIn_Link}'`},
                    PhoneNumber  = ${(typeof organizerData.phoneNumber === 'undefined' || organizerData.phoneNumber === '') ? 'PhoneNumber' : `'${organizerData.phoneNumber}'`},
                    Description  = ${(typeof organizerData.description === 'undefined' || organizerData.description === '') ? 'Description' : `'${organizerData.description}'`}
                WHERE UserID = ${organizerData.userID};
            `).then((result) => {
                console.log(result);
            })
        } catch (err) {
            console.log(err);
            throw err;
        }
    },

    checkOrganizerRole: async(userID) => {
        try{
            const result = db.Query(`
                SELECT OrganizerID
                FROM Organizer
                WHERE UserID = ${userID}
            `)
            return result;
        }
        catch (err) {
            console.log(err)
            throw err;
        }
    }

}
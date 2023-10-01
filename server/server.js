const express = require('express'); 
const bodyParser = require('body-parser'); // middleware to extract body of a req to convert it to a JSON object
const app = express();
const multer = require('./models/ModelMulter');
const AIToolrouter = require('./routes/ai_tools.r');
const ProfileRouter = require('./routes/profile.r')
const UserRouter = require('./routes/user.r')
require('dotenv').config()

// const session = require('express-session')
// enable CORS
const cors = require('cors')
app.use(cors());

// CREATE APP
const port = 3002;
// enable body-parser on Express
// for parsing application/json
app.use(bodyParser.json());
// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true,
}));
// for parsing multipart/form-data
 


// declare static files
app.use(express.static('public'))
app.use('/image', express.static('public/images')); // image when upload image for the model
app.use('/image', express.static('public/assets/images'));

// View engine setup
app.set('view engine', 'ejs');

AIToolrouter(app)
ProfileRouter(app)
UserRouter(app)

// Start the server on port 3002
const server = app.listen(port, (error) => {
    if (error) return console.log(`Error: ${error}`);
    console.log(`Server listening on port ${server.address().port}`);
});
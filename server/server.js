const express = require('express'); 
const cluster = require('cluster');
const { generateKeyPair } = require('crypto');
const bodyParser = require('body-parser'); // middleware to extract body of a req to convert it to a JSON object
const app = express();
const multer = require('./models/ModelMulter');
const AIToolrouter = require('./routes/ai_tools.r');
const ProfileRouter = require('./routes/profile.r')
const UserRouter = require('./routes/user.r')
const TrashRouter = require('./routes/trash.r')
const CampaignRouter = require('./routes/campaign.r')
const ReviewRouter = require('./routes/review.r')


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

// LOAD BALANCER 

// Check the number of available CPU.
const numCPUs = require('os').cpus().length;
 
// // API endpoint 
// // Send public key as a response

// // // For Master process
// // if (cluster.isMaster) {
// //     console.log(`Master ${process.pid} is running`);
   
// //     // Fork workers.
// //     for (let i = 0; i < numCPUs; i++) {
// //       cluster.fork();
// //     }
   
// //     // This event is first when worker died
// //     cluster.on('exit', (worker, code, signal) => {
// //       console.log(`worker ${worker.process.pid} died`);
// //     });
// //   }
   
// //   // For Worker
// //   else {
// //     // Workers can share any TCP connection
// //     // In this case it is an HTTP server
// //     app.listen(port, err => {
// //       err ?
// //         console.log("Error in server setup") :
// //         console.log(`Worker ${process.pid} started`);
// //     });
// // }

// ProfileRouter(app)
// UserRouter(app)
// TrashRouter(app)
// ReviewRouter(app)
// CampaignRouter(app)
// AIToolrouter(app)

// // Start the server on port 3002
// const server = app.listen(port, (error) => {
//     if (error) return console.log(`Error: ${error}`);
//     console.log(`Server listening on port ${server.address().port}`);
// });

if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);
  
    const numCPUs = require('os').cpus().length;
  
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }
  
    cluster.on('exit', (worker, code, signal) => {
      console.log(`worker ${worker.process.pid} died`);
    });
  } else {
    AIToolrouter(app);
    ProfileRouter(app);
    UserRouter(app);
    TrashRouter(app);
    ReviewRouter(app);
    CampaignRouter(app);
  
    const server = app.listen(port, (error) => {
      if (error) return console.log(`Error: ${error}`);
      console.log(`Worker ${process.pid} started. Server listening on port ${server.address().port}`);
    });
  }
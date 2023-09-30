var multer = require('multer');
var path = require('path')

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images'); // store image in folder public/images
       
    },
    filename: (req, file, cb) => {
        cb(null , `${Date.now()}${path.extname(file.originalname)}`); // save the file with the current date
    }
})

const upload = multer({ 
    storage: storage,
    fileFilter: function (req, file, callback) {
        // only accept image
        if (file.mimetype.split('/')[0] != 'image') 
        // var ext = path.extname(file.originalname);
        // if(ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg')
        {
            return callback(new Error('Only images are allowed'))
        }
        callback(null, true)
    },

}).single('file') // save the file on local

module.exports = upload;
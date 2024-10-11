const multer = require('multer');
const path = require('path');

// Set up storage for Multer to use disk storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/profileUploads/'); // Define the destination folder for uploads
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    }
});

// Create the multer instance using the defined storage
const upload = multer({ storage });

module.exports = upload;
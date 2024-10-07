const mongoose = require('mongoose');

const connect = (url) => {
    
    mongoose.connect(url)
    .then(console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));
    
}

module.exports = connect;
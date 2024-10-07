const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    short_id: {
        type: String,
        required: true,
        unique: true
    },
    redirect_url: {
        type: String,
        required: true
    },
    analytics: {
        timestamp: {
            type: Date,
            default: Date.now  
        }
       
    },
    createdBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }]
}, {
    timestamps: true
});

const URL = mongoose.model('Url', urlSchema);

module.exports = URL;
const mongoose = require('mongoose');

const adSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    start_date: Date,
    end_date: Date,
    budget: {
        type: Number,
        required: true,
        min: 0,
    },
    images: [{
        type: String,
    }],
    status: String,
    image: String,
    advertiser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Advertiser',
        required: true,
    },
    date_created: {
        type: Date,
        default: Date.now,
    }
});

exports.Ad = mongoose.model('Ad', adSchema);
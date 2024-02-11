const mongoose = require('mongoose');

const adSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        required: true,
    },
    video: String,
    device_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Device',
    },
    date_created: {
        type: Date,
        default: Date.now,
    }
});

exports.Ad = mongoose.model('Ad', adSchema);
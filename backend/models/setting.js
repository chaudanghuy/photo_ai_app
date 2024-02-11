const mongoose = require('mongoose');

const settingSchema = mongoose.Schema({
    image_assets: [{
        image: String,
        screen: String,
    }],
    filter_assets: [{
        filter: String,
        screen: String,
    }],
    text_assets: [{
        text: String,
        screen: String,
    }],
    date_updated: {
        type: Date,
        default: Date.now,
    },
});
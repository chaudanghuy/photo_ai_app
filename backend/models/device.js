const mongoose = require('mongoose');

const deviceSchema = mongoose.Schema({
    code: {
        type: String,
        required: true,
    },
    photo_time: {
        shooting_time: String,
        shutter_time: String,
    },
    print_price: [{
        type: String,
        required: true,
    }],
    product_price: [{
        product_name: String,
        price: String,
    }],
    contact_number_for_failure: String,
    status: {
        type: String,
        enum: ['online', 'offline', 'maintenance', 'error', 'unknown'],
        default: 'unknown',
    },
    date_created: {
        type: Date,
        default: Date.now,
    }
});

deviceSchema.virtual('id').get(function() {
    return this._id.toHexString();
});

deviceSchema.set('toJSON', {
    virtual: true,
});

exports.Device = mongoose.model('Device', deviceSchema);
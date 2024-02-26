 const mongoose = require('mongoose');

const deviceSchema = mongoose.Schema({
    name: String,
    number: String,
    photo_shooting_time: String,
    photo_suffer_time: String,
    store_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Store'
    },
    photo_work_time: String,    
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
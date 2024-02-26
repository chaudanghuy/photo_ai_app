const mongoose = require('mongoose');

const storeSchema = mongoose.Schema({
    code: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    date_created: {
        type: Date,
        default: Date.now,
    },
    is_active: Boolean,
});

storeSchema.virtual('id').get(function() {
    return this._id.toHexString();
});

storeSchema.set('toJSON', {
    virtual: true,
});

exports.Store = mongoose.model('Store', storeSchema);
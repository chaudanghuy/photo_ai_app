const mongoose = require('mongoose');

const accountSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    date_created: {
        type: Date,
        default: Date.now,
    },
    is_active: Boolean,
});

accountSchema.virtual('id').get(function() {
    return this._id.toHexString();
});

accountSchema.set('toJSON', {
    virtual: true,
});

exports.Account = mongoose.model('Account', accountSchema);
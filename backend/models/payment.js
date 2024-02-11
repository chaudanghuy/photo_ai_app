const mongoose = require('mongoose');

const paymentSchema = mongoose.Schema({
    method: {
        type: String,
        required: true,
    },
    secret_key: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        required: true,
    },
    date_created: {
        type: Date,
        default: Date.now,
    },
    is_active: Boolean,
});

const Payment = mongoose.model('Payment', paymentSchema);
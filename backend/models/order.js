const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    base_price: {
        type: String,
        required: true,
    },
    product_price: {
        type: String,
        required: true,
    },
    tax: {
        type: String,
        required: true,
    },
    total_price: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'in process', 'success', 'cancelled'],
        default: 'pending',
    },
    date_created: {
        type: Date,
        default: Date.now,
    },
    device_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Device',
    },
});

const Order = mongoose.model('Order', orderSchema);
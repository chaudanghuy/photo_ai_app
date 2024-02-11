const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema({
    payment_code: {
        type: String,
        required: true,
    },
    amount: {
        type: String,
        required: true,
    },
    payment_status: {
        type: String,
        enum: ['pending', 'in process', 'success', 'cancelled'],
        default: 'pending',
    },
    date_created: {
        type: Date,
        default: Date.now,
    },
    order_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
    },
    payment_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Payment',
    }
});

const Transaction = mongoose.model('Transaction', transactionSchema);
import mongoose, {Schema} from 'mongoose';

const {ORDER_STATUS} = require("../constants");

const AutoIncrement = require('mongoose-sequence')(mongoose);

// Order Schema
const OrderSchema = new Schema({
    id: {
        type: Number,
        unique: true
    },
    user: {
        type: String,
        default: 'Guest',
        require: true
    },
    status: {
        type: String,
        default: ORDER_STATUS.Processing,
        enum: [
            ORDER_STATUS.Processing,
            ORDER_STATUS.Delivered,
            ORDER_STATUS.Cancelled
        ]
    },
    items: [
        {
            itemId: {
                type: Number,
                required: true
            },
            item: {
                type: mongoose.Types.ObjectId,
                ref: 'Menu',
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            subTotalPrice: {
                type: Number,
                required: true
            },
        }
    ],
    subTotalPrice: {
        type: Number,
        required: true
    },
    taxAndFeesRateTotal: {
        type: Number,
        required: true
    },
    taxAndFeesPriceTotal: {
        type: Number,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    updated: Date,
    created: {
        type: Date,
        default: Date.now
    }
});

OrderSchema.plugin(AutoIncrement, {inc_field: 'id', start_seq: 1});

module.exports = mongoose.model('Order', OrderSchema);
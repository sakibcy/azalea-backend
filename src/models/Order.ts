import mongoose, { Schema } from 'mongoose';
const { ORDER_STATUS } = require("../constants");
// const AutoIncrement = require('mongoose-sequence')(mongoose);

// Define CartItemSchema
const CartItemSchema = new Schema({
    name: { type: String, required: true },
    imageUrl: { type: String, required: true },
    imageKey: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    slug: { type: String, required: true },
    id: { type: Number, required: true },
    quantity: { type: Number, required: true },
    subTotal: { type: Number, required: true }
});

// Define OrderSchema
const OrderSchema = new Schema({
    user: {
        type: String,
        default: 'Guest',
        required: true
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
    items: [CartItemSchema],
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
}, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});

// Apply the AutoIncrement plugin only once
// OrderSchema.plugin(AutoIncrement, { inc_field: 'id', start_seq: 1 });

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;

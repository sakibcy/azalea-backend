import mongoose, {Schema} from 'mongoose';

const { CART_ITEM_STATUS } = require('../constants');

// Cart Item Schema
const CartItemSchema = new Schema({
    menu: {
        type: Schema.Types.ObjectId,
        ref: 'Menu'
    },
    quantity: Number,
    purchasePrice: {
        type: Number,
        default: 0
    },
    totalPrice: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        default: CART_ITEM_STATUS.Processing,
        enum: [
            CART_ITEM_STATUS.Processing,
            CART_ITEM_STATUS.Delivered,
            CART_ITEM_STATUS.Cancelled
        ]
    }
});

module.exports = mongoose.model('CartItem', CartItemSchema);

// Cart Schema
const CartSchema = new Schema({
    menus: [CartItemSchema],
    updated: Date,
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Cart', CartSchema);
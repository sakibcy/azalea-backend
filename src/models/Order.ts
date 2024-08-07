import mongoose, {Schema} from 'mongoose';

// Order Schema
const OrderSchema = new Schema({
    cart: {
        type: Schema.Types.ObjectId,
        ref: 'Cart'
    },
    total: {
        type: Number,
        default: 0
    },
    updated: Date,
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Order', OrderSchema);
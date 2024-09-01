import mongoose, {Schema} from 'mongoose';

const AddOnSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    imageUrl: {
        type: String
    },
    imageKey: {
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    updated: Date,
    created: {
        type: Date,
        default: Date.now
    }
});

const AddOn = mongoose.model('AddOn', AddOnSchema);
module.exports = AddOn;

import mongoose, {Schema} from 'mongoose';

const AutoIncrement = require('mongoose-sequence')(mongoose);
const slug = require('mongoose-slug-generator');

const options = {
    separator: '-',
    lang: 'en',
    truncate: 120
};

mongoose.plugin(slug, options);

const MenuSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        slug: 'name',
        unique: true
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
    description: {
        type: String,
        required: true,
        trim: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    updated: Date,
    created: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true // Adds createdAt and updatedAt fields
});

module.exports = mongoose.model('Menu', MenuSchema);

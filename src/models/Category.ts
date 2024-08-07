import mongoose, {Schema} from 'mongoose';
const slug = require('mongoose-slug-generator');

const options = {
    separator: '-',
    lang: 'en',
    truncate: 120
};

mongoose.plugin(slug, options);

// Category Schema
const CategorySchema = new Schema({
    _id: {
        type: Schema.ObjectId,
        auto: true
    },
    name: {
        type: String,
        trim: true
    },
    slug: {
        type: String,
        slug: 'name',
        unique: true
    },
    image: {
        data: Buffer,
        contentType: String
    },
    description: {
        type: String,
        trim: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    menus: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Menu'
        }
    ],
    updated: Date,
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Category', CategorySchema);
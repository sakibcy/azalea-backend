import mongoose, {Schema} from 'mongoose';
import slugify from 'slugify';

const AutoIncrement = require('mongoose-sequence')(mongoose);

const MenuSchema = new Schema({
    id: {
        type: Number,
        unique: true
    },
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
    isAvailable: {
        type: Boolean,
        default: true
    },
    updated: Date,
    created: {
        type: Date,
        default: Date.now
    }
});

MenuSchema.plugin(AutoIncrement, { inc_field: 'id', start_seq: 1 });

// Pre-save hook to generate slug using slugify
MenuSchema.pre('save', function (next) {
    if (!this.isModified('name')) {
        return next(); // Skip if name hasn't changed
    }
    this.slug = slugify(this.name, {
        lower: true,
        locale: 'en'
    });
    next();
});

const Menu = mongoose.model('Menu', MenuSchema);
module.exports = Menu;

import mongoose, { Document, Schema } from 'mongoose';
const AutoIncrement = require('mongoose-sequence')(mongoose);

interface IMenu extends Document {
    id: number;
    image: string;
    name: string;
    price: number;
    category: string;
    description: string;
}

const menusSchema: Schema<IMenu> = new mongoose.Schema({
    id: {
        type: Number,
        unique: true
    },
    image: {
        type: String,
        required: true // URL or path to the item image
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true // Adds createdAt and updatedAt fields
});

menusSchema.plugin(AutoIncrement, { inc_field: 'id', start_seq: 1 });

const Menus = mongoose.model('Item', menusSchema);

module.exports = Menus;

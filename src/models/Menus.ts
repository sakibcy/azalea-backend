import mongoose, {Document, Mongoose, Schema} from 'mongoose';
const AutoIncrement = require('mongoose-sequence')(mongoose);

const MenusSchema = new Schema({
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

MenusSchema.plugin(AutoIncrement, { inc_field: 'id', start_seq: 1 });

// export default mongoose.model('Item', MenusSchema);

module.exports = mongoose.model('Menus', MenusSchema);

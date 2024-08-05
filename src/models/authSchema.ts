const Mongoose = require('mongoose');

const { Schema } = Mongoose;

const AuthSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = Mongoose.model('Auth', AuthSchema);
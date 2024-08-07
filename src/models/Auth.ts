// import mongoose, {Schema} from 'mongoose';

const Mongoose = require('mongoose');

const Schema = Mongoose.Schema;

const Auth = new Schema({
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

module.exports = Mongoose.model('Auth', Auth);
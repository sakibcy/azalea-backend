import mongoose, {Schema} from 'mongoose';

const TemporalUserSchema = new Schema({
    name: {
        type: String,
        default: 'Guest',
    }
});

const TemporalUser = mongoose.model('TemporalUser', TemporalUserSchema);

module .exports = TemporalUser;
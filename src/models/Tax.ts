import mongoose, {models, Schema} from "mongoose";

const TaxSchema = new Schema({
    name: {type: String, required: true},
    rate: {type: Number, required: true},
    description: {type: String},
    lastUpdated: Date
})

const Tax = mongoose.model('Tax', TaxSchema);

module.exports = Tax;
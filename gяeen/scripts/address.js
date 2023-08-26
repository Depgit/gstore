import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema({
    address1: {
        type: String,
        require: true
    },
    address2: String,
    city: {
        type: String,
        require: true
    },
    state: {
        type: String,
        require: true
    },
    state_code: String,
    pincode: {
        type: String,
        require: true
    },
    country: {
        type: String,
        require: true
    },
    country_code: String,
    created_on: {
        type: Date,
        default: Date.now,
    },
    updated_on: {
        type: Date,
        default: Date.now
    }
})


AddressSchema.pre('save', function (next) {
    this.updated_on = new Date();
    next();
});

const Address = mongoose.model('Address', AddressSchema);

export default Address
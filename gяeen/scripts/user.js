import mongoose from "mongoose";
import constant from '../constants/appConstant.js'

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password:{
        type: String,
        require: true
    },
    phone: String,
    type: String,
    name: String,
    referral_code: {
        type: String,
    },
    referred_by: String,
    details: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserDetails'
    },
    active: {
        type: Boolean,
        default: false,
    },
    deleted: {
        type: Boolean,
        default: false,
    },
    created_on: {
        type: Date,
        default: Date.now,
    },
    updated_on: {
        type: Date,
        default: Date.now()
    }
});

// Mongoose middleware (pre-save hook) to update the timestamp before updating a user
userSchema.pre('save', function (next) {
    this.updated_on = new Date();
    next();
});


const userDetailsSchema = new mongoose.Schema({
    date_of_birth: String,
    legal_name: String,
    pan_number:String,
    aadhar_number: String,
    residence: String,
    document : {
        identity_proof: String,
        address_proof_front: String,
        address_proof_back: String
    },
    status: {
        type: String,
        default: constant.NotSubmitted
    },
    created_on: {
        type: Date,
        default: Date.now,
    },
    updated_on: {
        type: Date,
        default: Date.now()
    }
})

userDetailsSchema.pre('save', function (next) {
    this.updated_on = new Date();
    next();
});

const User = mongoose.model('User', userSchema);
const KycStatus = mongoose.model('UserDetails', userDetailsSchema);

export {
    User,
    KycStatus
}

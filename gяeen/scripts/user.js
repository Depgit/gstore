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
    type: {
        type: String,
        default: ""
    },
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
        default: Date.now
    }
});

userSchema.pre('save', function (next) {
    this.updated_on = new Date();
    next();
});


const userDetailsSchema = new mongoose.Schema({
    phone: {
        type: String,
        default: "000 000 000"
    },
    date_of_birth: String,
    legal_name: String,
    pan_number:String,
    aadhar_number: String,
    address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address'
    },
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
const UserDetails = mongoose.model('UserDetails', userDetailsSchema);

export {
    User,
    UserDetails
}

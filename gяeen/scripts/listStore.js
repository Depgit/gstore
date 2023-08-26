import mongoose, { mongo } from "mongoose";

const ListStoreSchema = new mongoose.Schema({
    list_id: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    platform: {
        type: String,
        default: "GreenPellar"
    },
    domain: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address'
    },
    created_on: {
        type: Date,
        default: Date.now,
    },
    updated_on: {
        type: Date,
        default: Date.now
    }
})

ListStoreSchema.pre('save', function (next) {
    this.updated_on = new Date();
    next();
});


const ListStore = mongoose.model('ListStore',ListStoreSchema)

export {
    ListStore
}


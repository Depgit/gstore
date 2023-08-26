import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    url: {
        type: String
    },
    description: String,
    image_url: {
        type: String,
        require: true
    },
    vendor: {
        type: String
    },
    variants : {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Variant'
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

ProductSchema.pre('save', function (next) {
    this.updated_on = new Date();
    next();
});

const VariantSchema = new mongoose.Schema({
    title: String,
    image_url: {
        type: String,
        require: true
    },
    sku: {
        type: String,require: true
    },
    price: {
        type : Number, require: true
    },
    inventory_quantity: {
        type : Number, require: true
    },
    backorders: {
        type: String,
    },
    visibility: {
        type: String
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

VariantSchema.pre('save', function (next) {
    this.updated_on = new Date();
    next();
});


const Product = mongoose.model('Product', ProductSchema);
const Variant = mongoose.model('Variant', VariantSchema);

export {
    Product,
    Variant
}
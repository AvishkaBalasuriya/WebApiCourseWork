const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    vendor: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Vendor' 
    },
    category:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Category' 
    },
    name: String,
    description: String,
    price: Number,
    discount: Number,
    isAvailable: Boolean,
    status: Boolean,
    createdAt: {
        type:Date,
        default:Date()
    },
    updatedAt: {
        type:Date,
        default:Date()
    }
})

exports.productSchema = productSchema
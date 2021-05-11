const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    vendor: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Vendor' 
    },
    masterCategory:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'MasterCategory' 
    },
    subCategory:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'SubCategory' 
    },
    images: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'ProductImage',
        default:'https://firebasestorage.googleapis.com/v0/b/webapi-3e0ee.appspot.com/o/product_default.jpeg?alt=media&token=bfc3594d-f434-4420-820b-e8c4888830f1' 
    }],
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
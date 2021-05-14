const mongoose = require('mongoose')

const productImageSchema = new mongoose.Schema({
    product:{
        type:mongoose.Types.ObjectId,
        ref:'Product'
    },
    imageUrl: {
        type:String,
        default:'https://firebasestorage.googleapis.com/v0/b/webapi-3e0ee.appspot.com/o/product_default.jpeg?alt=media&token=bfc3594d-f434-4420-820b-e8c4888830f1' 
    },
    createdAt: {
        type:Date,
        default:Date()
    },
    updatedAt: {
        type:Date,
        default:Date()
    }
})

exports.productImageSchema = productImageSchema
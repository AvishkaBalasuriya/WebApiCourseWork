const mongoose = require('mongoose')

const cartItemSchema = new mongoose.Schema({
    cart:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Cart'
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Product'
    },
    qty:{
        type:Number,
        default:0
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

exports.cartItemSchema = cartItemSchema
const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    },
    cart: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Cart' 
    },
    total: Number,
    status: Number,
    createdAt: {
        type:Date,
        default:Date()
    },
    updatedAt: {
        type:Date,
        default:Date()
    }
})

exports.orderSchema = orderSchema
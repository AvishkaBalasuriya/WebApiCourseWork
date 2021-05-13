const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    order:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Order'
    },
    items: [{
            type: mongoose.Schema.Types.ObjectId,
            ref:'CartItem'
    }],
    createdAt: {
        type:Date,
        default:Date()
    },
    updatedAt: {
        type:Date,
        default:Date()
    }
})

exports.cartSchema = cartSchema
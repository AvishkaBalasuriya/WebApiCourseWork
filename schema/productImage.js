const mongoose = require('mongoose')

const productImageSchema = new mongoose.Schema({
    imageUrl: String,
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
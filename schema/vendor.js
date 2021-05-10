const mongoose = require('mongoose')

const vendorSchema = new mongoose.Schema({
    name: String,
    country: String,
    logo: String,
    createdAt: {
        type:Date,
        default:Date()
    },
    updatedAt: {
        type:Date,
        default:Date()
    }
})

exports.vendorSchema = vendorSchema
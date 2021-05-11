const mongoose = require('mongoose')

const vendorSchema = new mongoose.Schema({
    name: String,
    country: String,
    logo: {
        type:Date,
        default:"https://firebasestorage.googleapis.com/v0/b/webapi-3e0ee.appspot.com/o/vendor_default.png?alt=media&token=e2104df8-c7af-4b77-b976-949d89d4de69"
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

exports.vendorSchema = vendorSchema
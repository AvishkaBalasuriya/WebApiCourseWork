const mongoose = require('mongoose')

const vendorSchema = require('../schema/vendor').vendorSchema

exports.Vendor = mongoose.model('Vendor',vendorSchema)

exports.mongoose = mongoose
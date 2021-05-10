const mongoose = require('mongoose')

const productImageSchema = require('../schema/productImage').productImageSchema

const ProductImage = mongoose.model('ProductImage',productImageSchema)

exports.ProductImage = ProductImage

exports.mongoose = mongoose
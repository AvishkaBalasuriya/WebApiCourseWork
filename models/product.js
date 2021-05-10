const mongoose = require('mongoose')

const productSchema = require('../schema/product').productSchema

const Product = mongoose.model('Product',productSchema)

exports.Product = Product

exports.mongoose = mongoose
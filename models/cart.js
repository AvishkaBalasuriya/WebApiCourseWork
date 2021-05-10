const mongoose = require('mongoose')

const cartSchema = require('../schema/cart').cartSchema

const Cart = mongoose.model('Cart',cartSchema)

exports.Cart = Cart

exports.mongoose = mongoose
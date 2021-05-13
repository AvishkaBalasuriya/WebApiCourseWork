const mongoose = require('mongoose')

const cartItemSchema = require('../schema/cartItem').cartItemSchema

const CartItem = mongoose.model('CartItem',cartItemSchema)

exports.CartItem = CartItem

exports.mongoose = mongoose
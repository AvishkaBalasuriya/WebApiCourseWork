const mongoose = require('mongoose')

const orderSchema = require('../schema/order').orderSchema

const Order = mongoose.model('Order',orderSchema)

exports.Order = Order

exports.mongoose = mongoose
const mongoose = require('mongoose')

const otpSchema = require('../schema/otp').otpSchema

exports.Otp = mongoose.model('Otp',otpSchema)

exports.mongoose = mongoose
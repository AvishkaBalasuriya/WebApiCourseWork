const mongoose = require('mongoose')

const userSchema = require('../schema/user').userSchema

exports.User = mongoose.model('User',userSchema)

exports.mongoose = mongoose
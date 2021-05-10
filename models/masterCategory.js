const mongoose = require('mongoose')

const masterCategorySchema = require('../schema/masterCategory').masterCategorySchema

const MasterCategory = mongoose.model('MasterCategory',masterCategorySchema)

exports.MasterCategory = MasterCategory

exports.mongoose = mongoose
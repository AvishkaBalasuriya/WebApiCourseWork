const mongoose = require('mongoose')

const subCategorySchema = require('../schema/subCategory').subCategorySchema

const SubCategory = mongoose.model('SubCategory',subCategorySchema)

exports.SubCategory = SubCategory

exports.mongoose = mongoose
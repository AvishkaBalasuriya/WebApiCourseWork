const mongoose = require('mongoose')

const subCategorySchema = new mongoose.Schema({
    name:{
        type:String
    },
    createdAt: {
        type:Date,
        default:Date()
    },
    updatedAt: {
        type:Date,
        default:Date()
    }
})

exports.subCategorySchema = subCategorySchema
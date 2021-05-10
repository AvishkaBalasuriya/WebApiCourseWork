const mongoose = require('mongoose')

const masterCategorySchema = new mongoose.Schema({
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

exports.masterCategorySchema = masterCategorySchema
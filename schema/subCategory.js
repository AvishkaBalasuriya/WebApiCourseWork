const mongoose = require('mongoose')

const subCategorySchema = new mongoose.Schema({
    masterCategory:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'MasterCategory'
    },
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
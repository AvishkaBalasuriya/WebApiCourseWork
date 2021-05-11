const mongoose = require('mongoose')

const subCategorySchema = new mongoose.Schema({
    masterCategoryId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'MasterCategory'
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
},{ strict: false })

exports.subCategorySchema = subCategorySchema
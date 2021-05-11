const mongoose = require('mongoose')

const masterCategorySchema = new mongoose.Schema({
    name:{
        type:String
    },
    subCategory:[{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'SubCategory',
        default:[]
    }],
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
const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    products: [
        {
            product:{
                type: mongoose.Schema.Types.ObjectId,
                ref:'Product'
            },
            qty:{
                type:Number,
                default:0
            }        
        }
    ],
    createdAt: {
        type:Date,
        default:Date()
    },
    updatedAt: {
        type:Date,
        default:Date()
    }
})

exports.cartSchema = cartSchema
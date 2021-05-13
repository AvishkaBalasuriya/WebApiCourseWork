const userModel = require('../models/user')
const productModel = require('../models/product')
const orderModel = require('../models/order')
const vendorModel = require('../models/vendor')

function getAll(){
    return new Promise(async(resolve,reject)=>{
        try{
            let vendorCount = await vendorModel.Vendor.count()
            let userAdminCount = await userModel.User.count({type:1})
            let userCount = await userModel.User.count({type:0})
            let productCount = await productModel.Product.count()
            let orderCount = await orderModel.Order.count()
            let orderPendingCount = await orderModel.Order.count({status:0})
            let orderAcceptCount = await orderModel.Order.count({status:1})
            let orderProcessingCount = await orderModel.Order.count({status:2})
            let orderShippedCount = await orderModel.Order.count({status:3})
            let orderCompleteCount = await orderModel.Order.count({status:4})

            let data = {
                vendorCount:vendorCount,
                userAdminCount:userAdminCount,
                userCount:userCount,
                productCount:productCount,
                orderCount:orderCount,
                orderPendingCount:orderPendingCount,
                orderAcceptCount:orderAcceptCount,
                orderProcessingCount:orderProcessingCount,
                orderShippedCount:orderShippedCount,
                orderCompleteCount:orderCompleteCount
            }

            resolve(data)
        }catch(e){
            return reject({message:"Undetected error",error:e.message,code:500,data:null})
        }
    })
}

exports.getAll = getAll
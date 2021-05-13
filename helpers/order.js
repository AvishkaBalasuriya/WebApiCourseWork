const orderModel = require('../models/order')
const cartModel = require('../models/cart')
const cartItemModel = require('../models/cartItem')
const productModel = require('../models/product')

function getAll(){
    return new Promise(async(resolve,reject)=>{
        try{
            let orders = await orderModel.Order.find().populate([{
                path: 'user.email',
                model: 'User'
            }, {
                path: 'cart',
                model: 'Cart',
                populate: {
                    path: 'items',
                    model: 'CartItem',
                    populate: {
                        path: 'product',
                        model: 'Product',
                        populate: {
                            path: 'images',
                            model: 'ProductImage'
                        },
                    },
                },
            }])
            return resolve(orders)
        }catch(e){
            return reject({message:"Undetected error",error:e.message,code:500,data:null})
        }
    })
}

function getAllForUser(userId){
    return new Promise(async(resolve,reject)=>{
        try{
            let orders = await orderModel.Order.find({user:new orderModel.mongoose.Types.ObjectId(userId)}).populate([{
                path: 'user.email',
                model: 'User'
            }, {
                path: 'cart',
                model: 'Cart',
                populate: {
                    path: 'items',
                    model: 'CartItem',
                    populate: {
                        path: 'product',
                        model: 'Product',
                        populate: {
                            path: 'images',
                            model: 'ProductImage'
                        },
                    },
                },
            }])
            return resolve(orders)
        }catch(e){
            return reject({message:"Undetected error",error:e.message,code:500,data:null})
        }
    })
}

function getOneForUser(userId,orderId){
    return new Promise(async(resolve,reject)=>{
        try{
            let orders = await orderModel.Order.find({_id:new orderModel.mongoose.Types.ObjectId(orderId),user:new orderModel.mongoose.Types.ObjectId(userId)}).populate('user','cart')

            return resolve(orders)
        }catch(e){
            return reject({message:"Undetected error",error:e.message,code:500,data:null})
        }
    })
}

function getOne(orderId){
    return new Promise(async(resolve,reject)=>{
        try{
        
            let order = await orderModel.Order.findOne({_id:new orderModel.mongoose.Types.ObjectId(orderId)}).populate('user','cart')

            if(!order)
                return reject({message:null,error:"Unable to find order for provided order id",code:404,data:null})

            return resolve(product)

        }catch(e){
            return reject({message:"Undetected error",error:e.message,code:500,data:null})
        }
    })
}

function addOne(data){
    return new Promise(async(resolve,reject)=>{
        try{
            let order=new orderModel.Order({
                user:new orderModel.mongoose.Types.ObjectId(data.user),
                total:data.total,
                status:data.status
            })

            let cart = new cartModel.Cart({
                order:new orderModel.mongoose.Types.ObjectId(order._id),
                items:[]
            })

            await new Promise(async(resolve, reject) => {
                for(const cartProductData of data.cart){
                    console.log(cartProductData.product)
                    let cartItemData = new cartItemModel.CartItem({
                        cart: new cartModel.mongoose.Types.ObjectId(cart._id),
                        product:new productModel.mongoose.Types.ObjectId(cartProductData.productId),
                        qty:cartProductData.qty,
                    })
                    console.log(cartItemData.product)
                    await cartItemData.save()

                    cart.items.push(cartItemData._id)
                }
                return resolve(true)
            })

            cart.save().then((res)=>{
                order.cart=new cartModel.mongoose.Types.ObjectId(cart._id)
                order.save().then((res)=>{
                    return resolve("Order successfully saved")
                }).catch((e)=>{
                    return reject({message:"Unable to save to database",error:e.message,code:500,data:null})
                })
            })
        }catch(e){
            return reject({message:"Undetected error",error:e.message,code:500,data:null})
        }
    })
}

function updateOne(data){
    return new Promise(async(resolve,reject)=>{
        try{
            let order = await orderModel.Order.findOne({_id:new orderModel.mongoose.Types.ObjectId(data.orderId)})

            if(!order)
                return reject({message:null,error:'Unable to find order',code:404,data:null})

            order.status=data.status

            order.save().then((res)=>{
                return resolve("Order successfully saved")
            }).catch((e)=>{
                return reject({message:"Unable to save to database",error:e.message,code:500,data:null})
            })
            
        }catch(e){
            return reject({message:"Undetected error",error:e.message,code:500})
        }
    })
}

function deleteAll(){
    return new Promise(async(resolve,reject)=>{
        try{
            orderModel.Order.deleteMany().then(res=>{
                cartModel.Cart.deleteMany({order:new orderModel.mongoose.Types.ObjectId(res._id)}).then((res)=>{
                    cartItemModel.CartItem.deleteMany({cart:new cartModel.mongoose.Types.ObjectId(res._id)}).then((res)=>{
                        return resolve(true)
                    }).catch((e)=>{return reject({message:"Unable to delete",error:e.message,code:500,data:null})})
                }).catch((e)=>{return reject({message:"Unable to delete",error:e.message,code:500,data:null})})
            }).catch((e)=>{return reject({message:"Unable to delete",error:e.message,code:500,data:null})})
        }catch(e){
            return reject({message:"Undetected error",error:e.message,code:500,data:null})
        }
    })
}

function deleteOne(orderId){
    return new Promise(async(resolve,reject)=>{
        try{
            orderModel.Order.deleteOne({_id:new orderModel.mongoose.Types.ObjectId(orderId)}).then(res=>{
                cartModel.Cart.deleteOne({order:new orderModel.mongoose.Types.ObjectId(orderId)}).then((res)=>{
                    cartItemModel.CartItem.deleteMany({cart:new cartModel.mongoose.Types.ObjectId(res._id)}).then((res)=>{
                        return resolve(true)
                    }).catch((e)=>{return reject({message:"Unable to delete",error:e.message,code:500,data:null})})
                }).catch((e)=>{return reject({message:"Unable to delete",error:e.message,code:500,data:null})})
            }).catch((e)=>{return reject({message:"Unable to delete",error:e.message,code:500,data:null})})

        }catch(e){
            return reject({message:"Undetected error",error:e.message,code:500,data:null})
        }
    })
}

exports.getAll = getAll
exports.getAllForUser=getAllForUser
exports.getOneForUser=getOneForUser
exports.getOne = getOne
exports.addOne = addOne
exports.updateOne = updateOne
exports.deleteAll = deleteAll
exports.deleteOne = deleteOne
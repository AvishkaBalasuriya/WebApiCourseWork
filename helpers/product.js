const productModel = require('../models/product')

function getAll(){
    return new Promise(async(resolve,reject)=>{
        try{
        
            let products = await productModel.Product.find()

            return resolve(products)
        }catch(e){
            return reject(e.message)
        }
    })
}

function getOne(productId){
    return new Promise(async(resolve,reject)=>{
        try{
        
            let product = await productModel.Product.find({_id:new productModel.mongoose.Types.ObjectId(productId)})

            if(!product)
                return reject("Unable to find product for provided product id")

            return resolve(products)

        }catch(e){
            return reject(e.message)
        }
    })
}

function addOne(data){
    return new Promise(async(resolve,reject)=>{
        try{
        
            let product = await product.save()

            if(!product)
                return reject("Unable to add product to the database")

            return resolve(product._id)

        }catch(e){
            return reject(e.message)
        }
    })
}

function updateOne(productId){
    return new Promise(async(resolve,reject)=>{
        try{
        
            let products = productModel.Product.find()

            return resolve(products)
        }catch(e){
            return reject(e.message)
        }
    })
}

function updateAll(productId){
    return new Promise(async(resolve,reject)=>{
        try{
        
            let products = productModel.Product.find()

            return resolve(products)
        }catch(e){
            return reject(e.message)
        }
    })
}

function deleteAll(){
    return new Promise(async(resolve,reject)=>{
        try{
        
            let product = await product.delete()

            if(!product)
                return reject("Unable to delete all products in the database")

            return resolve(true)

        }catch(e){
            return reject(e.message)
        }
    })
}

function deleteOne(productId){
    return new Promise(async(resolve,reject)=>{
        try{
        
            let product = await product.delete({_id:new productModel.mongoose.Types.ObjectId(productId)})

            if(!product)
                return reject("Unable to delete product in the database")

            return resolve(true)

        }catch(e){
            return reject(e.message)
        }
    })
}

exports.getAll = getAll
exports.getOne = getOne
exports.addOne = addOne
exports.updateOne = updateOne
exports.updateAll = updateAll
exports.deleteAll = deleteAll
exports.deleteOne = deleteOne
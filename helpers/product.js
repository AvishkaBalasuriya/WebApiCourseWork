const productModel = require('../models/product')
const productImageModel = require('../models/productImage')

function getAll(){
    return new Promise(async(resolve,reject)=>{
        try{
            // await productModel.Product.find().lean().exec(function (err, products) {
            //     let productsImages = await productImageModel.ProductImage.find().populate('product')
            //     return resolve(products)
            // })
        }catch(e){
            return reject(e.message)
        }
    })
}

function getOne(productId){
    return new Promise(async(resolve,reject)=>{
        try{
        
            let product = await productModel.Product.findOne({_id:new productModel.mongoose.Types.ObjectId(productId)})

            if(!product)
                return reject("Unable to find product for provided product id")

            let productImages = await productImageModel.ProductImage.find({Product:product._id})

            product.images = productImages

            return resolve(product)

        }catch(e){
            return reject(e.message)
        }
    })
}

function addOne(data){
    return new Promise(async(resolve,reject)=>{
        try{

            product = new productModel.Product({
                vendor:new productModel.mongoose.Types.ObjectId(data.vendorId),
                masterCategory:new productModel.mongoose.Types.ObjectId(data.masterCategoryId),
                subCategory:new productModel.mongoose.Types.ObjectId(data.subCategoryId),
                name:data.name,
                description:data.description,
                price:data.price,
                discount:data.discount,
                isAvailable:data.isAvailable,
                status:data.status
            })

            product.save().then((res)=>{
                data.images.forEach(async(image) => {
                    let productImage = new productImageModel.ProductImage({
                        product:product._id,
                        imageUrl:image,
        
                    })
                    await productImage.save()
                })
                return resolve(product._id)
            }).catch((e)=>{
                return reject("Unable to add product to the database")
            })

        }catch(e){
            return reject(e.message)
        }
    })
}

function updateOne(productId,data){
    return new Promise(async(resolve,reject)=>{
        try{

            let product = await productModel.Product.findOne({_id:new productModel.mongoose.Types.ObjectId(productId)})

            if(!product)
                return reject("Unable to find product for provided product id")

            product.vendor=new productModel.mongoose.Types.ObjectId(data.vendorId),
            product.masterCategory=new productModel.mongoose.Types.ObjectId(data.masterCategoryId),
            product.subCategory=new productModel.mongoose.Types.ObjectId(data.subCategoryId),
            product.name=data.name,
            product.description=data.description,
            product.price=data.price,
            product.discount=data.discount,
            product.isAvailable=data.isAvailable,
            product.status=data.status
        
            product.save().then(res=>{return resolve(products)}).catch((e)=>{return reject("Unable to update product")})
            
        }catch(e){
            return reject(e.message)
        }
    })
}

function deleteAll(){
    return new Promise(async(resolve,reject)=>{
        try{

            product.delete().then(res=>{return resolve(true)}).catch((e)=>{return reject("Unable to delete all products in the database")})

        }catch(e){
            return reject(e.message)
        }
    })
}

function deleteOne(productId){
    return new Promise(async(resolve,reject)=>{
        try{
        
            product.delete({_id:new productModel.mongoose.Types.ObjectId(productId)}).then(res=>{return resolve(true)}).catch((e)=>{return reject("Unable to delete product in the database")})

        }catch(e){
            return reject(e.message)
        }
    })
}

exports.getAll = getAll
exports.getOne = getOne
exports.addOne = addOne
exports.updateOne = updateOne
exports.deleteAll = deleteAll
exports.deleteOne = deleteOne
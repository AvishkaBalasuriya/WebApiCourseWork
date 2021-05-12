const gcs = require('../services/gcs')

const productModel = require('../models/product')
const productImageModel = require('../models/productImage')

const gcsRef = new gcs.GCS()

function getAll(params=undefined){
    return new Promise(async(resolve,reject)=>{
        try{
            let query = {}

            if(params){
                let filters = {$or:[]}
                for (const [key, value] of Object.entries(params)) {
                    if(key==="keyword"){
                        filters['$or'].push({ $text: { $search: value } })
                        continue
                    }
                    filter = {}
                    filter[key]=value
                    filters['$or'].push(filter)
                }
                query=filters['$or']===[]?{}:filters
            }

            let products = await productModel.Product.find(query).populate('images','imageUrl')

            return resolve(products)

        }catch(e){
            return reject({message:"Undetected error",error:e.message,code:500,data:null})
        }
    })
}

function getOne(productId){
    return new Promise(async(resolve,reject)=>{
        try{
        
            let product = await productModel.Product.findOne({_id:new productModel.mongoose.Types.ObjectId(productId)}).populate('images','imageUrl')

            if(!product)
                return reject({message:null,error:"Unable to find product for provided product id",code:404,data:null})

            return resolve(product)

        }catch(e){
            return reject({message:"Undetected error",error:e.message,code:500,data:null})
        }
    })
}

function addOne(data){
    return new Promise(async(resolve,reject)=>{
        try{
            let imageObj = []

            let product=new productModel.Product({
                vendor:new productModel.mongoose.Types.ObjectId(),//data.vendorId),
                masterCategory:new productModel.mongoose.Types.ObjectId(data.masterCategoryId),
                subCategory:new productModel.mongoose.Types.ObjectId(data.subCategoryId),
                name:data.name,
                description:data.description,
                price:data.price,
                discount:data.discount,
                isAvailable:data.isAvailable,
                status:data.status
            })

            await new Promise(async(resolve, reject) => {
                for(const image of data.images){
                    let downloadUrl = await gcsRef.uploadImage(image).catch((e)=>{})
                    let productImage = new productImageModel.ProductImage({
                        product:product._id,
                        imageUrl:downloadUrl,
                    })
                    await productImage.save()

                    imageObj.push(productImage)
                }
                return resolve(true)
            })

            product.images = imageObj

            product.save().then((res)=>{
                return resolve("Product successfully saved")
            }).catch((e)=>{
                return reject({message:"Unable to save to database",error:e.message,code:500,data:null})
            })

        }catch(e){
            return reject({message:"Undetected error",error:e.message,code:500,data:null})
        }
    })
}

function updateOne(productId,data){
    return new Promise(async(resolve,reject)=>{
        try{

            let product = await productModel.Product.findOne({_id:new productModel.mongoose.Types.ObjectId(productId)})

            if(!product)
                return reject({message:null,error:"Unable to find product for provided product id",code:404,data:null})

            product.vendor=new productModel.mongoose.Types.ObjectId(data.vendorId),
            product.masterCategory=new productModel.mongoose.Types.ObjectId(data.masterCategoryId),
            product.subCategory=new productModel.mongoose.Types.ObjectId(data.subCategoryId),
            product.name=data.name,
            product.description=data.description,
            product.price=data.price,
            product.discount=data.discount,
            product.isAvailable=data.isAvailable,
            product.status=data.status
        
            product.save().then(res=>{return resolve(products)}).catch((e)=>{return reject({message:"Unable to save to database",error:e.message,code:500,data:null})})
            
        }catch(e){
            return reject({message:"Undetected error",error:e.message,code:500})
        }
    })
}

function deleteAll(){
    return new Promise(async(resolve,reject)=>{
        try{

            product.delete().then(res=>{return resolve(true)}).catch((e)=>{return reject({message:"Unable to delete",error:e.message,code:500,data:null})})

        }catch(e){
            return reject({message:"Undetected error",error:e.message,code:500,data:null})
        }
    })
}

function deleteOne(productId){
    return new Promise(async(resolve,reject)=>{
        try{
        
            product.delete({_id:new productModel.mongoose.Types.ObjectId(productId)}).then(res=>{return resolve(true)}).catch((e)=>{return reject({message:"Unable to delete",error:e.message,code:500,data:null})})

        }catch(e){
            return reject({message:"Undetected error",error:e.message,code:500,data:null})
        }
    })
}

exports.getAll = getAll
exports.getOne = getOne
exports.addOne = addOne
exports.updateOne = updateOne
exports.deleteAll = deleteAll
exports.deleteOne = deleteOne
const product = require('../helpers/product')

const jwtMiddleware = require('../middlewares/jwt').checkJWT
const checkAdminPermissions = require('../middlewares/permissionCheck').checkAdminPermissions
const upload = require('../middlewares/multer').uploadMulter

const validator = require('../utils/validators')

module.exports = (()=>{

    let routes = require('express').Router()

    routes.get('/',(request, respond)=>{
        try{
            let params = request.query!=={}?request.query:undefined

            product.getAll(params).then((products)=>{
                return respond.status(200).send({success:true,message:'Products successfully fetched',error:null,code:200,data:products})
            }).catch((e)=>{
                return respond.status(200).send({success:false,message:e.message,error:e.error,code:e.code,data:e.data})
            })
        }catch(e){
            return respond.status(500).send({success:false,message:'Unexpected error occurs',error:e.message,code:500,data:null})
        }
    })

    routes.get('/vendor/:id',(request, respond)=>{
        try{
            let vendorId = request.params.id

            if(!validator.validateEmptyFields(vendorId))
                return respond.status(200).send({success:false,message:'Missing or empty required fields',error:null,code:400,data:null})

            product.getForVendor(vendorId).then((products)=>{
                return respond.status(200).send({success:true,message:'Products successfully fetched',error:null,code:200,data:products})
            }).catch((e)=>{
                return respond.status(200).send({success:false,message:e.message,error:e.error,code:e.code,data:e.data})
            })
        }catch(e){
            return respond.status(500).send({success:false,message:'Unexpected error occurs',error:e.message,code:500,data:null})
        }
    })

    routes.get('/:id',(request, respond)=>{
        try{
            let productId = request.params.id

            if(!validator.validateEmptyFields(productId))
                return respond.status(200).send({success:false,message:'Missing or empty required fields',error:null,code:400,data:null})

            product.getOne(productId).then((products)=>{
                return respond.status(200).send({success:true,message:'Product successfully fetched',error:null,code:200,data:products})
            }).catch((e)=>{
                return respond.status(200).send({success:false,message:e.message,error:e.error,code:e.code,data:e.data})
            })
        }catch(e){
            return respond.status(500).send({success:false,message:'Unexpected error occurs',error:e.message,code:500,data:null})
        }
    })

    routes.post('/',jwtMiddleware,checkAdminPermissions,upload.array('images'),(request, respond)=>{
        try{
            if(request.fileValidationError){
                return respond.status(200).send({success:false,message:request.fileValidationError,error:null,code:400,data:null})
            }

            let images = []

            for (var i = 0; i < request.files.length; i++) {
                images.push(request.files[i].filename)
            }

            let vendorId=request.body.vendorId
            let masterCategoryId=request.body.masterCategoryId
            let subCategoryId=request.body.subCategoryId
            let name=request.body.name
            let description=request.body.description
            let price=request.body.price
            let discount=request.body.discount
            let isAvailable=request.body.isAvailable
            let status=request.body.status

            if(!validator.validateEmptyFields(vendorId,masterCategoryId,subCategoryId,name,description,price,discount,isAvailable,status))
                return respond.status(200).send({success:false,message:'Missing or empty required fields',error:null,code:400,data:null})

            let data={
                vendorId:vendorId,
                masterCategoryId:masterCategoryId,
                subCategoryId:subCategoryId,
                name:name,
                description:description,
                images:images,
                price:price,
                discount:discount,
                isAvailable:isAvailable,
                status:status
            }

            product.addOne(data).then((result)=>{
                return respond.status(200).send({success:true,message:'Product successfully added',error:null,code:200,data:result})
            }).catch((e)=>{
                return respond.status(200).send({success:false,message:e.message,error:e.error,code:e.code,data:e.data})
            })
        }catch(e){
            return respond.status(500).send({success:false,message:'Unexpected error occurs',error:e.message,code:500,data:null})
        }
    })

    routes.put('/',jwtMiddleware,checkAdminPermissions,upload.array('images', 5),(request, respond)=>{
        try{

            if(request.fileValidationError){
                return respond.status(200).send({success:false,message:request.fileValidationError,error:null,code:400,data:null})
            }

            let updatedImages = []

            for (var i = 0; i < request.files.length; i++) {
                updatedImages.push(request.files[i].filename)
            }

            let productId=request.body.productId
            let vendorId=request.body.vendorId
            let masterCategoryId=request.body.masterCategoryId
            let subCategoryId=request.body.subCategoryId
            let name=request.body.name
            let description=request.body.description
            let images=updatedImages
            let deletedImages=request.body.deletedImages
            let price=request.body.price
            let discount=request.body.discount
            let isAvailable=request.body.isAvailable
            let status=request.body.status

            if(!validator.validateEmptyFields(productId,vendorId,masterCategoryId,subCategoryId,name,description,price,discount,isAvailable,status))
                return respond.status(200).send({success:false,message:'Missing or empty required fields',error:null,code:400,data:null})

            let data={
                productId:productId,
                vendorId:vendorId,
                masterCategoryId:masterCategoryId,
                subCategoryId:subCategoryId,
                name:name,
                description:description,
                images:images,
                deletedImages:deletedImages,
                price:price,
                discount:discount,
                isAvailable:isAvailable,
                status:status
            }

            product.updateOne(data).then((result)=>{
                return respond.status(200).send({success:true,message:'Product successfully updated',error:null,code:200,data:result})
            }).catch((e)=>{
                return respond.status(200).send({success:false,message:e.message,error:e.error,code:e.code,data:e.data})
            })
        }catch(e){
            return respond.status(500).send({success:false,message:'Unexpected error occurs',error:e.message,code:500,data:null})
        }
    })

    routes.delete('/',jwtMiddleware,checkAdminPermissions,(request, respond)=>{
        try{
            product.deleteAll().then((result)=>{
                return respond.status(200).send({success:true,message:'All Products successfully deleted',error:null,code:200,data:result})
            }).catch((e)=>{
                return respond.status(200).send({success:false,message:e.message,error:e.error,code:e.code,data:e.data})
            })
        }catch(e){
            return respond.status(500).send({success:false,message:'Unexpected error occurs',error:e.message,code:500,data:null})
        }
    })

    routes.delete('/:id',jwtMiddleware,checkAdminPermissions,(request, respond)=>{
        try{
            let productId=request.params.id

            if(!validator.validateEmptyFields(productId))
                return respond.status(200).send({success:false,message:'Missing or empty required fields',error:null,code:400,data:null})

            product.deleteOne(productId).then((result)=>{
                return respond.status(200).send({success:true,message:'Product successfully deleted',error:null,code:200,data:result})
            }).catch((e)=>{
                return respond.status(200).send({success:false,message:e.message,error:e.error,code:e.code,data:e.data})
            })
        }catch(e){
            return respond.status(500).send({success:false,message:'Unexpected error occurs',error:e.message,code:500,data:null})
        }
    })

    return routes
})()
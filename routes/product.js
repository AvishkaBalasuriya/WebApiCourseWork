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
                return respond.status(200).send({success:true,message:'Products successfully fetched',error:null,data:products})
            }).catch((e)=>{
                return respond.status(200).send({success:false,message:'Unable to fetch products',error:e,data:null})
            })
        }catch(e){
            return respond.status(500).send({success:false,message:'Unexpected error occurs',error:e.message,data:null})
        }
    })

    routes.get('/get/:id',(request, respond)=>{
        try{
            let productId = request.params.id

            if(!validator.validateEmptyFields(productId))
                return respond.status(200).send({success:false,message:'Missing or empty required fields',error:null,data:null})

            product.getOne(productId).then((products)=>{
                return respond.status(200).send({success:true,message:'Product successfully fetched',error:null,data:products})
            }).catch((e)=>{
                return respond.status(200).send({success:false,message:'Unable to fetch product',error:e,data:null})
            })
        }catch(e){
            return respond.status(500).send({success:false,message:'Unexpected error occurs',error:e.message,data:null})
        }
    })

    routes.post('/add',jwtMiddleware,checkAdminPermissions,upload.array('images', 4),(request, respond)=>{
        try{
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
                return respond.status(200).send({success:false,message:'Missing or empty required fields',error:null,data:null})

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
                return respond.status(200).send({success:true,message:'Product successfully added',error:null,data:result})
            }).catch((e)=>{
                return respond.status(200).send({success:false,message:'Unable to add product',error:e,data:null})
            })
        }catch(e){
            return respond.status(500).send({success:false,message:'Unexpected error occurs',error:e.message,data:null})
        }
    })

    routes.put('/update',jwtMiddleware,checkAdminPermissions,(request, respond)=>{
        try{
            let productId=request.body.productId
            let vendorId=request.body.vendorId
            let masterCategoryId=request.body.masterCategoryId
            let subCategoryId=request.body.subCategoryId
            let name=request.body.name
            let description=request.body.description
            let images=request.body.images
            let price=request.body.price
            let discount=request.body.discount
            let isAvailable=request.body.isAvailable
            let status=request.body.status

            if(!validator.validateEmptyFields(productId,vendorId,masterCategoryId,subCategoryId,name,description,images,price,discount,isAvailable,status))
                return respond.status(200).send({success:false,message:'Missing or empty required fields',error:null,data:null})

            let data={
                productId:productId,
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

            product.updateOne(productId,data).then((result)=>{
                return respond.status(200).send({success:true,message:'Product successfully updated',error:null,data:result})
            }).catch((e)=>{
                return respond.status(200).send({success:false,message:'Unable to update product',error:e,data:null})
            })
        }catch(e){
            return respond.status(500).send({success:false,message:'Unexpected error occurs',error:e.message,data:null})
        }
    })

    routes.delete('/delete',jwtMiddleware,checkAdminPermissions,(request, respond)=>{
        try{
            product.deleteAll().then((result)=>{
                return respond.status(200).send({success:true,message:'All Products successfully deleted',error:null,data:result})
            }).catch((e)=>{
                return respond.status(200).send({success:false,message:'Unable to delete products',error:e,data:null})
            })
        }catch(e){
            return respond.status(500).send({success:false,message:'Unexpected error occurs',error:e.message,data:null})
        }
    })

    routes.delete('/delele/:id',jwtMiddleware,checkAdminPermissions,(request, respond)=>{
        try{
            let productId=request.body.productId

            if(!validator.validateEmptyFields(productId))
                return respond.status(200).send({success:false,message:'Missing or empty required fields',error:null,data:null})

            product.deleteOne(productId).then((result)=>{
                return respond.status(200).send({success:true,message:'Product successfully deleted',error:null,data:result})
            }).catch((e)=>{
                return respond.status(200).send({success:false,message:'Unable to delete product',error:e,data:null})
            })
        }catch(e){
            return respond.status(500).send({success:false,message:'Unexpected error occurs',error:e.message,data:null})
        }
    })

    return routes
})()
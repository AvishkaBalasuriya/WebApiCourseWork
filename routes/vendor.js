const vendor = require('../helpers/vendor')

const jwtMiddleware = require('../middlewares/jwt').checkJWT
const checkAdminPermissions = require('../middlewares/permissionCheck').checkAdminPermissions
const uploadMulter = require('../middlewares/multer').uploadMulter

const validator = require('../utils/validators')

module.exports = (()=>{

    let routes = require('express').Router()

    routes.get('/',jwtMiddleware,checkAdminPermissions,(request, respond)=>{
        try{
            vendor.getAll().then((vendors)=>{
                return respond.status(200).send({success:true,message:'Vendors successfully fetched',error:null,code:200,data:vendors})
            }).catch((e)=>{
                return respond.status(200).send({success:false,message:e.message,error:e.error,code:e.code,data:e.data})
            })
        }catch(e){
            return respond.status(500).send({success:false,message:'Unexpected error occurs',error:e.message,data:null})
        }
    })

    routes.post('/add',jwtMiddleware,checkAdminPermissions,uploadMulter.array('logo', 1),(request, respond)=>{
        try{

            let data = {
                name:request.body.name,
                country:request.body.country,
                logo:request.files[0].filename
            }

            if(!validator.validateEmptyFields(data.name,data.country))
                return respond.status(200).send({success:false,message:'Missing or empty required fields',error:null,data:null})

            vendor.addNewVendor(data).then((products)=>{
                return respond.status(200).send({success:true,message:'Venfor successfully added',error:null,code:200,data:products})
            }).catch((e)=>{
                return respond.status(200).send({success:false,message:e.message,error:e.error,code:e.code,data:e.data})
            })
        }catch(e){
            return respond.status(500).send({success:false,message:'Unexpected error occurs',error:e.message,data:null})
        }
    })

    routes.delete('/delete/vendor',jwtMiddleware,checkAdminPermissions,(request, respond)=>{
        try{
            let masterCategoryId = request.body.masterCategoryId

            if(!validator.validateEmptyFields(masterCategoryId))
                return respond.status(200).send({success:false,message:'Missing or empty required fields',error:null,data:null})

            category.deleteMasterCategory(masterCategoryId).then((products)=>{
                return respond.status(200).send({success:true,message:'Master category & Sub categoris successfully deleted',error:null,code:200,data:products})
            }).catch((e)=>{
                return respond.status(200).send({success:false,message:e.message,error:e.error,code:e.code,data:e.data})
            })
        }catch(e){
            return respond.status(500).send({success:false,message:'Unexpected error occurs',error:e.message,data:null})
        }
    })

    return routes
})()
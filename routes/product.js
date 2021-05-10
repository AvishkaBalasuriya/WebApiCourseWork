const product = require('../helpers/product')
const jwtMiddleware = require('../middlewares/jwt').checkJWT
const checkAdminPermissions = require('../middlewares/permissionCheck').checkAdminPermissions

const validator = require('../utils/validators')

module.exports = (()=>{

    let routes = require('express').Router()

    routes.get('/',(request, respond)=>{
        try{
            product.getAll().then((products)=>{
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
            let productId = request.body.productId

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

    routes.post('/add',jwtMiddleware,checkAdminPermissions,(request, respond)=>{
        try{
        }catch(e){
            return respond.status(500).send({success:false,message:'Unexpected error occurs',error:e.message,data:null})
        }
    })

    routes.put('/update',jwtMiddleware,checkAdminPermissions,(request, respond)=>{
        try{
        }catch(e){
            return respond.status(500).send({success:false,message:'Unexpected error occurs',error:e.message,data:null})
        }
    })

    routes.delete('/delete',jwtMiddleware,checkAdminPermissions,(request, respond)=>{
        try{
        }catch(e){
            return respond.status(500).send({success:false,message:'Unexpected error occurs',error:e.message,data:null})
        }
    })

    routes.delete('/delele/:id',jwtMiddleware,checkAdminPermissions,(request, respond)=>{
        try{
        }catch(e){
            return respond.status(500).send({success:false,message:'Unexpected error occurs',error:e.message,data:null})
        }
    })

    return routes
})()
const userModel = require('../models/user')

const login = require('../auth/login')
const register = require('../auth/register')
const forget = require('../auth/forget')

const jwtMiddleware = require('../middlewares/jwt').checkJWT
const checkAdminPermissions = require('../middlewares/permissionCheck').checkAdminPermissions

const validator = require('../utils/validators')

module.exports = (()=>{

    let routes = require('express').Router()

    routes.post('/login',(request, respond)=>{
        try{
            let email = request.body.email
            let password = request.body.password

            if(!validator.validateEmptyFields(email,password))
                return respond.status(200).send({success:false,message:'Missing or empty required fields',error:null,data:null})

            login(email,password).then((result)=>{
                return respond.status(200).send({success:true,message:'Successfully authenticated',error:null,data:result})
            }).catch((error)=>{
                return respond.status(200).send({success:false,message:'Login failed',error:error,data:null})
            })
        }catch(e){
            return respond.status(500).send({success:false,message:'Unexpected error occurs',error:e.message,data:null})
        }
    })

    routes.post('/register',(request, respond)=>{
        try{

            let email = request.body.email
            let password = request.body.password
            let passwordConfirm = request.body.passwordConfirm
            let firstName = request.body.firstName
            let lastName = request.body.lastName
            let mobileNumber = request.body.mobileNumber
            let address = request.body.address
            let isSocial = request.body.isSocial
            let type = request.body.type

            if(!validator.validateEmptyFields(email,password,passwordConfirm,firstName,lastName,address,isSocial,type))
                return respond.status(200).send({success:false,message:'Missing or empty required fields',error:null,data:null})

            if(!validator.validateEmail(email))
                return respond.status(200).send({success:false,message:'Provided email is not valid',error:null,data:null})

            if(mobileNumber && !validator.validateMobileNumber(mobileNumber))
                return respond.status(200).send({success:false,message:'Provided mobile number is not valid',error:null,data:null})
            
            if(!validator.validateConfirmPassword(password,passwordConfirm))
                return respond.status(200).send({success:false,message:'Passwords not matching',error:null,data:null})
    
            if(!validator.validatePassword(password))
                return respond.status(200).send({success:false,message:'Password mot matching security criteria',error:null,data:null})
    
            let user = new userModel.User({email:email,rawPassword:password,firstName:firstName,
                lastName:lastName,mobileNumber:mobileNumber,address:address,isSocial:isSocial,type:type})
            
            register(user).then((result)=>{
                return respond.status(200).send({success:true,message:'User successfully registered',error:null,data:result})
            }).catch((error)=>{
                return respond.status(200).send({success:false,message:'Registration failed',error:error,data:null})
            })
        }catch(e){
            return respond.status(500).send({success:false,message:'Unexpected error occurs',error:e.message,data:null})
        }
    })

    routes.post('/register/admin',jwtMiddleware,checkAdminPermissions,(request, respond)=>{
        try{

            let email = request.body.email
            let password = request.body.password
            let passwordConfirm = request.body.passwordConfirm
            let firstName = request.body.firstName
            let lastName = request.body.lastName
            let mobileNumber = request.body.mobileNumber
            let address = request.body.address
            let isSocial = request.body.isSocial
            let type = 1

            if(!validator.validateEmptyFields(email,password,passwordConfirm,firstName,lastName,address,isSocial))
                return respond.status(200).send({success:false,message:'Missing or empty required fields',error:null,data:null})

            if(!validator.validateEmail(email))
                return respond.status(200).send({success:false,message:'Provided email is not valid',error:null,data:null})

            if(mobileNumber && !validator.validateMobileNumber(mobileNumber))
                return respond.status(200).send({success:false,message:'Provided mobile number is not valid',error:null,data:null})
            
            if(!validator.validateConfirmPassword(password,passwordConfirm))
                return respond.status(200).send({success:false,message:'Passwords not matching',error:null,data:null})
    
            if(!validator.validatePassword(password))
                return respond.status(200).send({success:false,message:'Password mot matching security criteria',error:null,data:null})
    
            let user = new userModel.User({email:email,rawPassword:password,firstName:firstName,
                lastName:lastName,mobileNumber:mobileNumber,address:address,isSocial:isSocial,type:type})
            
            register(user).then((result)=>{
                return respond.status(200).send({success:true,message:'Admin User successfully registered',error:null,data:result})
            }).catch((error)=>{
                return respond.status(200).send({success:false,message:'Admin Registration failed',error:error,data:null})
            })
        }catch(e){
            return respond.status(500).send({success:false,message:'Unexpected error occurs',error:e.message,data:null})
        }
    })

    routes.post('/forget',(request, respond)=>{
        try{
            let otpId = request.body.otpId
            let password = request.body.password
            let passwordConfirm = request.body.passwordConfirm
    
            if(!validator.validateEmptyFields(otpId,password,passwordConfirm))
                return respond.status(200).send({success:false,message:'Missing or empty required fields',error:null,data:null})
                
            if(!validator.validateConfirmPassword(password,passwordConfirm))
                return respond.status(200).send({success:false,message:'Passwords not matching',error:null,data:null})
    
            if(!validator.validatePassword(password))
                return respond.status(200).send({success:false,message:'Password mot matching security criteria',error:null,data:null})
    
            forget(otpId,password).then((result)=>{
                return respond.status(200).send({success:true,message:'Password successfully changed',error:null,data:result})
            }).catch((error)=>{
                return respond.status(200).send({success:false,message:'Password reset failed',error:error,data:null})
            })
        }catch(e){
            return respond.status(500).send({success:false,message:'Unexpected error occurs',error:e.message,data:null})
        }
    })

    return routes

})()
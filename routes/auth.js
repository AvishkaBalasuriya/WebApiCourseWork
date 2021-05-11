const userModel = require('../models/user')

const login = require('../auth/login')
const register = require('../auth/register')
const forget = require('../auth/forget')

const otp = require('../helpers/otp')

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

            let data = {
                email:request.body.email,
                password:request.body.password,
                passwordConfirm:request.body.passwordConfirm,
                firstName:request.body.firstName,
                lastName:request.body.lastName,
                mobileNumber:request.body.mobileNumber,
                address:request.body.address,
                isSocial:request.body.isSocial,
                type:request.body.type
            }

            if(!validator.validateEmptyFields(data.email,data.password,data.passwordConfirm,data.firstName,data.lastName,data.address,data.isSocial,data.type))
                return respond.status(200).send({success:false,message:'Missing or empty required fields',error:null,data:null})

            if(!validator.validateEmail(data.email))
                return respond.status(200).send({success:false,message:'Provided email is not valid',error:null,data:null})

            if(data.mobileNumber && !validator.validateMobileNumber(data.mobileNumber))
                return respond.status(200).send({success:false,message:'Provided mobile number is not valid',error:null,data:null})
            
            if(!validator.validateConfirmPassword(data.password,data.passwordConfirm))
                return respond.status(200).send({success:false,message:'Passwords not matching',error:null,data:null})
    
            if(!validator.validatePassword(data.password))
                return respond.status(200).send({success:false,message:'Password mot matching security criteria',error:null,data:null})
    
            let user = new userModel.User({email:data.email,rawPassword:data.password,firstName:data.firstName,
                lastName:data.lastName,mobileNumber:data.mobileNumber,address:data.address,isSocial:data.isSocial,type:data.type})
            
            register(user).then((result)=>{

                otp.issueAnOtp(email,0).then((result)=>{
                    delete data[password]
                    delete data[passwordConfirm]
                    delete data[type]
                    data[userId]=result.userId

                    return respond.status(200).send({success:true,message:'User successfully registered and an OTP code sent to the user email',error:null,data:data})
                }).catch((error)=>{
                    return respond.status(200).send({success:false,message:'User registered but unable to issue an OTP',error:error,data:null})
                })

            }).catch((error)=>{
                return respond.status(200).send({success:false,message:'Admin Registration failed',error:error,data:null})
            })
        }catch(e){
            return respond.status(500).send({success:false,message:'Unexpected error occurs',error:e.message,data:null})
        }
    })

    routes.post('/register/admin',jwtMiddleware,checkAdminPermissions,(request, respond)=>{
        try{

            let data = {
                email:request.body.email,
                password:request.body.password,
                passwordConfirm:request.body.passwordConfirm,
                firstName:request.body.firstName,
                lastName:request.body.lastName,
                mobileNumber:request.body.mobileNumber,
                address:request.body.address,
                isSocial:request.body.isSocial,
                type:1
            }

            if(!validator.validateEmptyFields(data.email,data.password,data.passwordConfirm,data.firstName,data.lastName,data.address,data.isSocial))
                return respond.status(200).send({success:false,message:'Missing or empty required fields',error:null,data:null})

            if(!validator.validateEmail(data.email))
                return respond.status(200).send({success:false,message:'Provided email is not valid',error:null,data:null})

            if(data.mobileNumber && !validator.validateMobileNumber(data.mobileNumber))
                return respond.status(200).send({success:false,message:'Provided mobile number is not valid',error:null,data:null})
            
            if(!validator.validateConfirmPassword(data.password,data.passwordConfirm))
                return respond.status(200).send({success:false,message:'Passwords not matching',error:null,data:null})
    
            if(!validator.validatePassword(data.password))
                return respond.status(200).send({success:false,message:'Password mot matching security criteria',error:null,data:null})
    
            let user = new userModel.User({email:data.email,rawPassword:data.password,firstName:data.firstName,
                lastName:data.lastName,mobileNumber:data.mobileNumber,address:data.address,isSocial:data.isSocial,type:data.type})
            
            register(user).then((result)=>{

                otp.issueAnOtp(email,0).then((result)=>{
                    delete data[password]
                    delete data[passwordConfirm]
                    delete data[type]
                    data[userId]=result.userId

                    return respond.status(200).send({success:true,message:'Admin user successfully registered and an OTP code sent to the user email',error:null,data:data})
                }).catch((error)=>{
                    return respond.status(200).send({success:false,message:'User registered but unable to issue an OTP',error:error,data:null})
                })

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
const otp = require('../helpers/otp')
const validator = require('../utils/validators')

module.exports = (()=>{

    let routes = require('express').Router()

    routes.post('/issue',(request, respond)=>{
        try{
            let contact = request.body.contact

            if(!validator.validateEmptyFields(contact))
                return respond.status(200).send({success:false,message:'Missing or empty required fields',error:null,code:400,data:null})

            let contactType = validator.validateContactType(contact)

            if(contactType===-1)
                return respond.status(200).send({success:false,message:'Provided contact is not valid',error:null,code:400,data:null})
            
            otp.issueAnOtp(contact,contactType).then((result)=>{
                return respond.status(200).send({success:true,message:'OTP code successfully sent to '+contact,error:null,data:result})
            }).catch((e)=>{
                return respond.status(200).send({success:false,message:e.message,error:e.error,code:e.code,data:e.data})
            })
        }catch(e){
            return respond.status(500).send({success:false,message:'Unexpected error occurs',error:e.message,code:500,data:null})
        }
    })

    routes.post('/verify', (request, respond)=>{
        try{
            let userId = request.body.userId
            let otpCode = request.body.otpCode

            if(!validator.validateEmptyFields(otpCode,userId))
                return respond.status(200).send({success:false,message:'Missing or empty required fields',error:null,code:400,data:null})

            if(!validator.isNumber(otpCode))
                return respond.status(200).send({success:false,message:'Invalid OTP code',error:null,code:400,data:null})
            
            otp.verifyAnOtp(otpCode,userId).then((result)=>{
                return respond.status(200).send({success:true,message:"OTP code successfully verified",error:null,data:result})
            }).catch((e)=>{
                return respond.status(200).send({success:false,message:e.message,error:e.error,code:e.code,data:e.data})
            })
        }catch(e){
            return respond.status(500).send({success:false,message:'Unexpected error occurs',error:e.message,code:500,data:null})
        }
    })

    return routes
})()
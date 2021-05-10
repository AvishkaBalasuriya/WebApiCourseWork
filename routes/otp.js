
const otp = require('../helpers/otp')
const validator = require('../utils/validators')

module.exports = (()=>{

    let routes = require('express').Router()

    routes.post('/issue',(request, respond)=>{
        try{
            let contact = request.body.contact

            if(!validator.validateEmptyFields(contact))
                return respond.status(200).send({success:false,message:'Missing or empty required fields',error:null,data:null})

            let contactType = validator.validateContactType(contact)

            if(contactType===-1)
                return respond.status(200).send({success:false,message:'Provided contact is not valid',error:null,data:null})
            
            otp.issueAnOtp(contact,contactType).then((result)=>{
                return respond.status(200).send({success:true,message:'OTP code successfully sent to '+contact,error:null,data:result})
            }).catch((error)=>{
                return respond.status(200).send({success:false,message:'Unable to issue an OTP',error:error,data:null})
            })
        }catch(e){
            return respond.status(500).send({success:false,message:'Unexpected error occurs',error:e.message,data:null})
        }
    })

    routes.post('/verify', (request, respond)=>{
        try{
            let userId = request.body.userId
            let otpCode = request.body.otpCode

            if(!validator.validateEmptyFields(otpCode,userId))
                return respond.status(200).send({success:false,message:'Missing or empty required fields',error:null,data:null})

            if(!validator.isNumber(otpCode))
                return respond.status(200).send({success:false,message:'Invalid OTP code',error:null,data:null})
            
            otp.verifyAnOtp(otpCode,userId).then((result)=>{
                return respond.status(200).send({success:true,message:"OTP code successfully verified",error:null,data:result})
            }).catch((error)=>{
                return respond.status(200).send({success:false,message:'Unable to verify OTP code',error:error,data:null})
            })
        }catch(e){
            return respond.status(500).send({success:false,message:'Unexpected error occurs',error:e.message,data:null})
        }
    })

    return routes
})()
const codeGenerator = require('../utils/codeGenerator')
const validators = require('../utils/validators')
const time = require('../utils/time')

const sms = require('../services/sms')
const email = require('../services/email')

const userModel = require('../models/user')
const otpModel = require('../models/otp')

function issueAnOtp(contact,contactType){
    return new Promise(async(resolve,reject)=>{
        try{
            if(contactType){
                var user = await userModel.User.findOne({mobileNumber:contact})
            }else{
                var user = await userModel.User.findOne({email:contact})
            }

            if(!user)
                return reject("Contact information is not match with any of our users")
    
            let code = codeGenerator.generateOtp()
    
            let otpDetails = otpModel.Otp({user:user,code:code,sentTo:contactType})
    
            let messageContent = "Please use below OTP to reset your password. \n "+code.toString()
    
            if(contactType===1){
                await sms.sendSms(contact,messageContent).catch((error)=>{
                    return reject(error)
                })
            }else{
                await email.sendEmail(contact,"Verify OTP",messageContent).catch((error)=>{
                    return reject(error)
                })
            }
    
            otpDetails.save().then((res)=>{
                let data = {
                    userId:user._id
                }
        
                return resolve(data)
            }).catch((e)=>{return reject("Unable to save otp details")})
    
        }catch(e){
            return reject(e.message)
        }
    })
}

function verifyAnOtp(otp,userId){
    return new Promise(async(resolve,reject)=>{
        try{
            let otpDetails = await otpModel.Otp.findOne({user:new userModel.mongoose.Types.ObjectId(userId),code:otp})

            if(!otpDetails)
                return reject("Invalid OTP code")
            
            let user = await userModel.User.findOne({_id:new userModel.mongoose.Types.ObjectId(userId)})

            if(otpDetails.isVerified)
                return reject("This OTP code is already verified")

            let timeAfterOtpIssued = time.calculateTimeDifferent(otpDetails.createdAt,new Date())

            if(timeAfterOtpIssued>=120)
                return reject("OTP code expired. Please try with new OTP")

            if(user.status!=1){
                user.status=1

                otpDetails.isVerified = true
                otpDetails.isActive = false

                await user.save()
                await otpDetails.save()

                let data = {
                    userId:otpDetails.user._id
                }
                
                return resolve(data)
            }
            
            let uuid = codeGenerator.generateUUID()

            otpDetails.isVerified = true
            otpDetails.isActive = true
            otpDetails.uuid = uuid

            otpDetails.save().then((res)=>{
                let data = {
                    userId:otpDetails.user._id,
                    otpId:uuid
                }
            
                return resolve(data)
            }).catch((e)=>{return reject("Unable to save otp details")})
            
        }catch(e){
            return reject(e.message)
        }
    })
}

exports.issueAnOtp = issueAnOtp
exports.verifyAnOtp = verifyAnOtp
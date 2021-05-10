const codeGenerator = require('../utils/codeGenerator')
const validators = require('../utils/validators')
const time = require('../utils/time')

const sms = require('../services/sms')

const userModel = require('../models/user')
const otpModel = require('../models/otp')

function issueAnOtp(contact){
    return new Promise(async(resolve,reject)=>{
        try{
            let user = await userModel.User.findOne({ $or: [ {email:contact},{mobileNumber:contact} ] })
    
            if(!user)
                return reject("Contact information is not match with any of our users")
    
            let code = codeGenerator.generateOtp()

            let contactType = validators.validateContactType(contact)
    
            let otpDetails = otpModel.Otp({user:user,code:code,sentTo:contactType})
    
            let messageContent = "Please use below OTP to reset your password. \n "+code.toString()
    
            if(contactType===1){
                await sms.sendSms(contact,messageContent).catch((error)=>{
                    return reject(error);
                })
            }else{
                console.log("Sending email")
                //Send email
            }
    
            let result = await otpDetails.save()
    
            if(!result)
                return reject("Unable to save otp details")
    
            let data = {
                userId:user._id
            }
    
            return resolve(data)
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

            if(otpDetails.isVerified)
                return reject("This OTP code is already verified")

            let timeAfterOtpIssued = time.calculateTimeDifferent(otpDetails.createdAt,new Date())

            if(timeAfterOtpIssued>=120){
                return reject("OTP code expired. Please try with new OTP")
            }
            
            let uuid = codeGenerator.generateUUID()

            otpDetails.isVerified = true
            otpDetails.isActive = true
            otpDetails.uuid = uuid

            let result = await otpDetails.save()

            if(!result)
                return reject("Unable to save otp details")

            let data = {
                userId:otpDetails.user._id,
                otpId:uuid
            }

            return resolve(data)
        }catch(e){
            return reject(e.message)
        }
    })
}

exports.issueAnOtp = issueAnOtp
exports.verifyAnOtp = verifyAnOtp
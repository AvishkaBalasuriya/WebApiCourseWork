const otpModel = require('../models/otp')
const userModel = require('../models/user')

const jwt = require('../utils/jwt')

module.exports=((otpId,rawPassword)=>{
    return new Promise(async(resolve,reject)=>{
        try{
            let otpDetails = await otpModel.Otp.findOne({uuid:otpId})

            if(!otpDetails)
                return reject("Invalid OTP id")

            if(!otpDetails.isActive)
                return reject("This OTP is already used")
            
            let user = await userModel.User.findOne({_id:new userModel.mongoose.Types.ObjectId(otpDetails.user)})

            otpDetails.isActive=false

            user.rawPassword = rawPassword

            let userResult = await user.save()
            let otpResult = await otpDetails.save()

            if(!userResult && !otpResult)
                return reject("Unable complete db transaction")

            let payload = jwt.makePayloadWithUser(otpDetails.user)

            return resolve({'accessToken':jwt.generateJWT(payload)})
        }catch(e){
            return reject(e.message)
        }
    })
})
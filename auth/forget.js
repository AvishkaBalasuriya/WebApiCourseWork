const otpModel = require('../models/otp')
const userModel = require('../models/user')

const jwt = require('../utils/jwt')

module.exports=((otpId,rawPassword)=>{
    return new Promise(async(resolve,reject)=>{
        try{
            let otpDetails = await otpModel.Otp.findOne({uuid:otpId})

            if(!otpDetails)
                return reject({message:null,error:"Invalid OTP id",code:401})

            if(!otpDetails.isActive)
                return reject({message:null,error:"This OTP is already used",code:401})
            
            let user = await userModel.User.findOne({_id:new userModel.mongoose.Types.ObjectId(otpDetails.user)})

            otpDetails.isActive=false

            user.rawPassword = rawPassword

            user.save().then((res)=>{

                otpDetails.save().then((res)=>{

                    let payload = jwt.makePayloadWithUser(otpDetails.user)
                    return resolve({'accessToken':jwt.generateJWT(payload)})

                }).catch((e)=>{return reject({message:"Unable complete db transaction",error:e.message,code:500})})
                
            }).catch((e)=>{return reject({message:"Unable save user to database",error:e.message,code:500})})

        }catch(e){
            return reject(e.message)
        }
    })
})
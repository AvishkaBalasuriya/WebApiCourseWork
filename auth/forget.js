const otpModel = require('../models/otp')
const userModel = require('../models/user')

const admin = require('firebase-admin')

const jwt = require('../utils/jwt')

module.exports=((otpId,rawPassword)=>{
    return new Promise(async(resolve,reject)=>{

        try{
            let otpDetails = await otpModel.Otp.findOne({uuid:otpId})

            if(!otpDetails)
                return reject({message:null,error:"Invalid OTP id",code:401,data:null})

            if(!otpDetails.isActive)
                return reject({message:null,error:"This OTP is already used",code:401,data:null})
            
            let user = await userModel.User.findOne({_id:new userModel.mongoose.Types.ObjectId(otpDetails.user)})

            otpDetails.isActive=false

            admin.auth().updateUser(user.firebaseUid,{password:rawPassword}).then(()=>{
                otpDetails.save().then((res)=>{

                    let payload = jwt.makePayloadWithUser(otpDetails.user)
                    return resolve({'accessToken':jwt.generateJWT(payload)})

                }).catch((e)=>{return reject({message:"Unable complete db transaction",error:e.message,code:500,data:null})})
            }).catch((e)=>{return reject({message:"Unable change user password",error:e.message,code:500,data:null})})

        }catch(e){
            return reject({message:"Undetected error",error:e.message,code:500,data:null})
        }
    })
})
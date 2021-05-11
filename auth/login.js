const otp = require('../helpers/otp')

const userModel = require('../models/user')

const hasher = require('../utils/hasher')
const jwt = require('../utils/jwt')

module.exports=((email,password)=>{
    return new Promise(async(resolve,reject)=>{
        try{
            let user = await userModel.User.findOne({email:email})

            if(!user)
                return reject({message:null,error:'User with provided email not exists',code:401,data:null})
            if(!(user.password===hasher.hash(password))){
                return reject({message:null,error:'Invalid email or password',code:401,data:null})
            }
            if(user.status===false){
                otp.issueAnOtp(user.email,0).then((result)=>{
                    return reject({message:"Account not veriied",error:'User account not activate yet. Please verify your email address. Email verification code sent to your email address. OTP code sent',code:503,data:{userId:user._id}})
                }).catch((error)=>{
                    return respond.status(200).send({success:false,message:'Unable to issue an OTP',error:error,data:null,data:null})
                })
            }

            let payload = jwt.makePayloadWithUser(user)

            return resolve({'accessToken':jwt.generateJWT(payload)})
        }catch(e){
            return reject({message:"Undetected error",error:e.message,code:500,data:null})
        }
    })
})
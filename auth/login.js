const otp = require('../helpers/otp')

const userModel = require('../models/user')

const jwt = require('../utils/jwt')

const auth = require('../services/firebase').getAuth()

module.exports=((email,password)=>{
    return new Promise(async(resolve,reject)=>{
        try{
            auth.signInWithEmailAndPassword(email,password).then(async()=>{
                let user = await userModel.User.findOne({email:email})
                if(user.status===false){
                    otp.issueAnOtp(user.email,0).then((result)=>{
                        return reject({message:"Account not veriied",error:'User account not activate yet. Please verify your email address. Email verification code sent to your email address. OTP code sent',code:503,data:{userId:user._id}})
                    }).catch((e)=>{
                        return respond.status(200).send({success:false,message:e.message,error:e.error,code:e.code,data:null})
                    })
                }else{
                    let payload = jwt.makePayloadWithUser(user)
                    return resolve({'accessToken':jwt.generateJWT(payload)})
                }
            }).catch((e)=>{
                return reject({message:'User with provided email not exists',error:e.message,code:401,data:null})
            })
        }catch(e){
            return reject({message:"Undetected error",error:e.message,code:500,data:null})
        }
    })
})
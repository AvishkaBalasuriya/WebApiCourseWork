const userModel = require('../models/user')

const hasher = require('../utils/hasher')
const jwt = require('../utils/jwt')

module.exports=((email,password)=>{
    return new Promise(async(resolve,reject)=>{
        try{
            let user = await userModel.User.findOne({email:email})

            if(!user)
                return reject({message:null,error:'User with provided email not exists',code:401})
            if(!(user.password===hasher.hash(password))){
                return reject({message:null,error:'Invalid email or password',code:401})
            }
            if(user.status===false){
                return reject({message:"Account not veriied",error:'User account not activate yet. Please verify your email address. Email verification code sent to your email address.',code:503})
            }

            let payload = jwt.makePayloadWithUser(user)

            return resolve({'accessToken':jwt.generateJWT(payload)})
        }catch(e){
            return reject(e.message)
        }
    })
})
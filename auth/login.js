const userModel = require('../models/user')

const hasher = require('../utils/hasher')
const jwt = require('../utils/jwt')

module.exports=((email,password)=>{
    return new Promise(async(resolve,reject)=>{
        try{
            let user = await userModel.User.findOne({email:email})

            if(!user)
                return reject('User with provided email not exists')
            if(!(user.password===hasher.hash(password))){
                return reject('Invalid email or password')
            }
            if(user.status===false){
                return reject('User account not activate yet. Please verify your email address. Email verification code sent to your email address.')
            }

            let payload = jwt.makePayloadWithUser(user)

            return resolve({'accessToken':jwt.generateJWT(payload)})
        }catch(e){
            return reject(e.message)
        }
    })
})
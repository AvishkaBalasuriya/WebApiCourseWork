const userModel = require('../models/user')

module.exports=((user)=>{
    return new Promise(async(resolve,reject)=>{
        try{
            let isUserAlreadyRegistered = (await userModel.User.find({email:user.email})).length===0

            if(!isUserAlreadyRegistered)
                return reject('User already registered')

            user.save().then((res)=>{
                let data = {
                    userId:user._id,
                }
                return resolve(data)
            }).catch((e)=>{return reject('Unable to save user')})

        }catch(e){
            return reject(e.message)
        }
    })
})
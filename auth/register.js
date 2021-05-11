const userModel = require('../models/user')

module.exports=((user)=>{
    return new Promise(async(resolve,reject)=>{
        try{
            let isUserAlreadyRegistered = (await userModel.User.find({email:user.email})).length===0

            if(!isUserAlreadyRegistered)
                return reject({message:null,error:'User already registered',code:409,data:null})

            user.save().then((res)=>{
                let data = {
                    userId:user._id,
                }
                return resolve(data)
            }).catch((e)=>{return reject({message:'Unable to save user',error:e.message,code:500,data:null})})

        }catch(e){
            return reject({message:"Undetected error",error:e.message,code:500,data:null})
        }
    })
})
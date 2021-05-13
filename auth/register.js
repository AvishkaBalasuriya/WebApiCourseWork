const userModel = require('../models/user')
const auth = require('../services/firebase').getAuth()

module.exports=((data)=>{
    return new Promise(async(resolve,reject)=>{
        try{
            let isUserAlreadyRegistered = (await userModel.User.find({email:data.email})).length===0

            if(!isUserAlreadyRegistered)
                return reject({message:null,error:'User already registered',code:409,data:null})

            let user = new userModel.User({email:data.email,firstName:data.firstName,
                lastName:data.lastName,mobileNumber:data.mobileNumber,address:data.address,isSocial:data.isSocial,type:data.type})

            auth.createUserWithEmailAndPassword(data.email, data.password).then((userInstance) => {
                user.firebaseUid=userInstance.uid
                user.save().then((res)=>{
                    let data = {
                        userId:user._id,
                    }
                    return resolve(data)
                }).catch((e)=>{return reject({message:'Unable to save user',error:e.message,code:500,data:null})})
            }).catch((e) => {
                console.log("d")
                return reject({message:'Unable to create user',error:e.message,code:500,data:null})
            })

        }catch(e){
            return reject({message:"Undetected error",error:e.message,code:500,data:null})
        }
    })
})
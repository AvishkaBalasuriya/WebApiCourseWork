const masterCategoryModel = require('../models/masterCategory').MasterCategory
const subCategoryModel = require('../models/subCategory').SubCategory

function getAll(){
    return new Promise(async(resolve,reject)=>{
        try{
            let categories = await masterCategoryModel.find().populate('subCategory')
        
            resolve(categories)
        }catch(e){
            return reject(e.message)
        }
    })
}

function addNewMasterCategory(name){
    return new Promise(async(resolve,reject)=>{
        try{
            let masterCategory = new masterCategoryModel.MasterCategory({
                name:name
            })

            let result = await masterCategory()
        }catch(e){
            return reject(e.message)
        }
    })
}

function addNewSubCategory(otp,userId){
    return new Promise(async(resolve,reject)=>{
        try{
            let otpDetails = await otpModel.Otp.findOne({user:new userModel.mongoose.Types.ObjectId(userId),code:otp})

            if(!otpDetails)
                return reject("Invalid OTP code")
            
            let user = await userModel.User.findOne({_id:new userModel.mongoose.Types.ObjectId(userId)})

            if(otpDetails.isVerified)
                return reject("This OTP code is already verified")

            let timeAfterOtpIssued = time.calculateTimeDifferent(otpDetails.createdAt,new Date())

            if(timeAfterOtpIssued>=120)
                return reject("OTP code expired. Please try with new OTP")

            if(user.status!=1){
                user.status=1

                otpDetails.isVerified = true
                otpDetails.isActive = false

                await user.save()
                await otpDetails.save()

                let data = {
                    userId:otpDetails.user._id
                }
                
                return resolve(data)
            }
            
            let uuid = codeGenerator.generateUUID()

            otpDetails.isVerified = true
            otpDetails.isActive = true
            otpDetails.uuid = uuid

            otpDetails.save().then((res)=>{
                let data = {
                    userId:otpDetails.user._id,
                    otpId:uuid
                }
            
                return resolve(data)
            }).catch((e)=>{return reject("Unable to save otp details")})
            
        }catch(e){
            return reject(e.message)
        }
    })
}

exports.getAll = getAll
exports.addNewMasterCategory = addNewMasterCategory
exports.addNewMasterCategory = addNewMasterCategory
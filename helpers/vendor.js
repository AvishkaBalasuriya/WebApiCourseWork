const gcs = require('../services/gcs')

const vendorModel = require('../models/vendor')

const gcsRef = new gcs.GCS()

function getAll(){
    return new Promise(async(resolve,reject)=>{
        try{
            let vendors = await vendorModel.Vendor.find()
        
            resolve(vendors)
        }catch(e){
            return reject({message:"Undetected error",error:e.message,code:500,data:null})
        }
    })
}

function addNewVendor(data){
    return new Promise(async(resolve,reject)=>{
        try{
            let logoUrl = await gcsRef.uploadImage(data.logo).catch((e)=>{return null})

            let vendor = new vendorModel.Vendor({
                name:data.name,
                country:data.country,
                logo:logoUrl
            })

            logoUrl===null?delete vendor[logo]:null

            vendor.save().then((res)=>{
                return resolve({vendorId:vendor._id})
            }).catch((e)=>{return reject({message:"Unable to save to database",error:e.message,code:500,data:null})})
        }catch(e){
            return reject({message:"Undetected error",error:e.message,code:500,data:null})
        }
    })
}

function deleteVendor(vendorId){
    return new Promise(async(resolve,reject)=>{
        try{
            let masterCategory = await vendorModel.Vendor.findOne({_id:new vendorModel.mongoose.Types.ObjectId(masterCategoryId)})

            if(!masterCategory)
                return reject({message:null,error:"Invalid master category ID",code:404,data:null})

            let subCategory = new subCategoryModel.SubCategory({
                name:SubCategoryName
            })

            subCategory.save().then((res)=>{
                console.log(masterCategory)
                masterCategory.subCategory.push(subCategory._id)
                masterCategory.save().then((res)=>{
                    return resolve({subCategoryId:subCategory._id})
                }).catch((e)=>{
                    return reject({message:"Unable to save to database",error:e.message,code:500,data:null})
                })
            }).catch((e)=>{return reject({message:"Unable to save to database",error:e.message,code:500,data:null})})
            
        }catch(e){
            return reject({message:"Undetected error",error:e.message,code:500,data:null})
        }
    })
}

exports.getAll = getAll
exports.addNewVendor = addNewVendor
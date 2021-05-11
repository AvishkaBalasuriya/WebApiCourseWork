const vendorModel = require('../models/vendor')

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
            
            let vendor = new masterCategoryModel.MasterCategory({
                name:data.name,
                country:data.country,
                logo:
            })

            masterCategory.save().then((res)=>{
                return resolve({masterCategoryId:masterCategory._id})
            }).catch((e)=>{return reject({message:"Unable to save to database",error:e.message,code:500,data:null})})
        }catch(e){
            return reject({message:"Undetected error",error:e.message,code:500,data:null})
        }
    })
}

function addNewSubCategory(masterCategoryId,SubCategoryName){
    return new Promise(async(resolve,reject)=>{
        try{
            let masterCategory = await masterCategoryModel.MasterCategory.findOne({_id:new masterCategoryModel.mongoose.Types.ObjectId(masterCategoryId)})

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
exports.addNewMasterCategory = addNewMasterCategory
exports.addNewSubCategory = addNewSubCategory
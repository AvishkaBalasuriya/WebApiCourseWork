const masterCategoryModel = require('../models/masterCategory')
const subCategoryModel = require('../models/subCategory')

function getAll(){
    return new Promise(async(resolve,reject)=>{
        try{
            let categories = await masterCategoryModel.MasterCategory.find().populate('subCategory')
        
            resolve(categories)
        }catch(e){
            return reject({message:"Undetected error",error:e.message,code:500,data:null})
        }
    })
}

function addNewMasterCategory(name){
    return new Promise(async(resolve,reject)=>{
        try{
            let masterCategory = new masterCategoryModel.MasterCategory({
                name:name
            })

            masterCategory.save().then((res)=>{
                return resolve(data)
            }).catch((e)=>{return reject({message:"Unable to save to database",error:e.message,code:500,data:null})})
        }catch(e){
            return reject({message:"Undetected error",error:e.message,code:500,data:null})
        }
    })
}

function addNewSubCategory(masterCategoryId,SubCategoryName){
    return new Promise(async(resolve,reject)=>{
        try{
            let masterCategory = await new masterCategoryModel.find({_id:new masterCategoryModel.mongoose.Types.ObjectId(masterCategoryId)})

            if(!MasterCategory)
                return reject({message:null,error:"Invalid master category ID",code:404,data:null})

            let subCategory = new subCategoryModel.SubCategory({
                name:SubCategoryName
            })

            subCategory.save().then((res)=>{
                masterCategory.subCategory.push(subCategory._id).then((res)=>{
                    return resolve(data)
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
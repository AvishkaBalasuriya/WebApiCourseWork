const masterCategoryModel = require('../models/masterCategory')
const subCategoryModel = require('../models/subCategory')

function getAll(){
    return new Promise(async(resolve,reject)=>{
        try{
            let categories = await masterCategoryModel.MasterCategory.find().populate('subCategory')
        
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

            masterCategory.save().then((res)=>{
                return resolve(data)
            }).catch((e)=>{return reject("Unable to save master category")})
        }catch(e){
            return reject(e.message)
        }
    })
}

function addNewSubCategory(masterCategoryId,SubCategoryName){
    return new Promise(async(resolve,reject)=>{
        try{
            let masterCategory = await new masterCategoryModel.find({_id:new masterCategoryModel.mongoose.Types.ObjectId(masterCategoryId)})

            if(!MasterCategory)
                return reject("Invalid master category ID")

            let subCategory = new subCategoryModel.SubCategory({
                name:SubCategoryName
            })

            subCategory.save().then((res)=>{
                masterCategory.subCategory.push(subCategory._id).then((res)=>{
                    return resolve(data)
                }).catch((e)=>{
                    return reject("Unable to complete database transaction")
                })
            }).catch((e)=>{return reject("Unable to save master category")})
            
        }catch(e){
            return reject(e.message)
        }
    })
}

exports.getAll = getAll
exports.addNewMasterCategory = addNewMasterCategory
exports.addNewSubCategory = addNewSubCategory
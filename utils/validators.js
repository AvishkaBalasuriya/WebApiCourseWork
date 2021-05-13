const axios = require('axios')
const config = require('config')

function validatePassword(password){
    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/gm
    return password.match(pattern)!=null
}

function validateConfirmPassword(password,confirmPassword){
    return password===confirmPassword
}

function validateEmptyFields(...args){
    let is_valid = true
    args.forEach((arg)=>{
        if(typeof(arg)==Array){
            if(arg.length==0)
                is_valid=false
        }
        else if(arg===undefined || arg==="")
            is_valid = false
    })
    return is_valid
}

function isNumber(...args){
    let pattern = /^[0-9]+$/gm
    let is_valid = true
    args.forEach((arg)=>{
        if(typeof(otpCode)!=Number && arg.match(pattern)==null)
            is_valid = false
    })
    return is_valid
}

function validateMobileNumber(contact,countryCode){
    return new Promise((resolve,reject)=>{
        let configApi = {
            method: 'GET',
            url: `${config.get("mobileValidation.url")}?access_key=${config.get("mobileValidation.apiKey")}&number=${contact}&country_code=${countryCode}`
        }
        axios(configApi).then((response)=>{
            if(response.data.success===false)
                return reject({status:false,message:null,error:response.data.error.info,code:400,data:null})
            if(response.data.valid===false)
                return reject({status:false,message:null,error:"Invalid mobile number format",code:400,data:null})
            return resolve({status:true,data:response.data.international_format.slice(1,response.data.international_format.length)})
        }).catch((e)=>{
            return reject({status:false,message:e.message,error:null,code:424,data:null})
        })
    })
}

function validateEmail(contact){
    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gm
    return contact.match(pattern)!=null?1:0
}

async function validateContactType(contact){
    return new Promise((resolve,reject)=>{
        validateMobileNumber(contact,"LK").then((res)=>{
            resolve({status:1,data:res.data})
        }).catch((e)=>{
            if(validateEmail(contact))
                resolve({status:0,data:contact})
            resolve({status:-1})
        })
    })
}

exports.validatePassword=validatePassword
exports.validateConfirmPassword=validateConfirmPassword
exports.validateEmptyFields=validateEmptyFields
exports.validateMobileNumber=validateMobileNumber
exports.validateEmail=validateEmail
exports.validateContactType=validateContactType
exports.isNumber=isNumber
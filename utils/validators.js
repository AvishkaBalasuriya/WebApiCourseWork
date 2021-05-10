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

function validateMobileNumber(contact){
    const pattern = /^\d{1,3}\d{8}$/gm
    return contact.match(pattern) != null?1:0
}

function validateEmail(contact){
    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gm
    return contact.match(pattern)!=null?1:0
}

function validateContactType(contact){
    if(validateMobileNumber(contact))
        return 1
    if(validateEmail(contact))
        return 0
    return -1
}

exports.validatePassword=validatePassword
exports.validateConfirmPassword=validateConfirmPassword
exports.validateEmptyFields=validateEmptyFields
exports.validateMobileNumber=validateMobileNumber
exports.validateEmail=validateEmail
exports.validateContactType=validateContactType
exports.isNumber=isNumber
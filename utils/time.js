var timediff = require('timediff')

function calculateTimeDifferent(oldDate, newDate) {  
    // const oldDateutc = Date.UTC(oldDate.getFullYear(), oldDate.getMonth(), oldDate.getDate())
    // const newDateutc = Date.UTC(newDate.getFullYear(), newDate.getMonth(), newDate.getDate())
    // let seconds = 1000*60*60*24*24*60*60
    // return (newDateutc - oldDateutc)/seconds
    return timediff(oldDate,newDate,'S')['seconds']
}

exports.calculateTimeDifferent=calculateTimeDifferent
const nodemailer = require('nodemailer')
const config = require('config')

function sendEmail(to,subject,text){
    return new Promise((resolve,reject)=>{
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: config.get('email.user'),
              pass: config.get('email.pass')
            }
        })

        let mailOptions = {
            from: config.get('email.user'),
            to: to,
            subject: subject,
            text: text
        }

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                reject(error)
            } else {
                resolve(true)
            }
        })
    })
}

exports.sendEmail=sendEmail
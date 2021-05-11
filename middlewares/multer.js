const multer = require('multer')
const uuid = require('uuid')

const DIR = './temp/'

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR)
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-')
        cb(null,uuid.v4()+fileName)
    }
})

const manageFiles = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        try{
            if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
                cb(null, true)
            } else {
                cb(null, false)
                cb(new Error('Only .png, .jpg and .jpeg format allowed!'))
            }
        }catch(e){
            console.log(e)
        }
    }
})

exports.manageFiles=manageFiles

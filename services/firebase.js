let firebase = require('firebase')
let admin = require("firebase-admin")

const serviceAccount = require('../config/firebaseStorage.json')

let configs = {
    apiKey: "AIzaSyDsSFhxDimSp5Vx3gx4QMpd_xwD7sdzK-E",
    authDomain: "webapi-3e0ee.firebaseapp.com",
    projectId: "webapi-3e0ee",
    storageBucket: "gs://webapi-3e0ee.appspot.com",
    messagingSenderId: "26882674159",
    appId: "1:26882674159:web:ec590ed498996de696ba1a",
    measurementId: "G-35YK6GJEZC"
}

firebase.default.initializeApp(configs)
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket:"gs://webapi-3e0ee.appspot.com"
})

function getAdminAuth(){
    return admin.auth()
}

function getAuth(){
    return firebase.default.auth()
}

function getBucket(){
    return admin.storage().bucket()
}

exports.getAuth=getAuth
exports.getBucket=getBucket
exports.getAdminAuth=getAdminAuth
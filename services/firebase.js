let firebase = require('firebase')
let admin = require("firebase-admin")

let configs = {
    apiKey: "AIzaSyDsSFhxDimSp5Vx3gx4QMpd_xwD7sdzK-E",
    authDomain: "webapi-3e0ee.firebaseapp.com",
    projectId: "webapi-3e0ee",
    storageBucket: "webapi-3e0ee.appspot.com",
    messagingSenderId: "26882674159",
    appId: "1:26882674159:web:ec590ed498996de696ba1a",
    measurementId: "G-35YK6GJEZC"
}

firebase.default.initializeApp(configs)
admin.initializeApp(configs)

function getAuth(){
    return firebase.default.auth()
}

function getBucket(){
    return admin.storage().bucket()
}

exports.getAuth=getAuth
exports.getBucket=getBucket
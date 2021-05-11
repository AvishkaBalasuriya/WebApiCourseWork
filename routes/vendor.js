const gcs = require('../services/gcs')

module.exports = (()=>{

    let routes = require('express').Router()

    routes.get('/test',(request, respond)=>{
        let gcsRef = new gcs.GCS()
        gcsRef.uploadImage('server.js').then((r)=>{
            respond.status(200).send({"data":r})
        }).catch((e)=>{
            respond.status(200).send({"data":e})
        })
    })

    return routes
})()
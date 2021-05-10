module.exports = (()=>{

    let routes = require('express').Router()

    routes.get('/test', (request, respond)=>{
        respond.status(200).send({"data":"I am working in order"})
    })

    return routes
})()
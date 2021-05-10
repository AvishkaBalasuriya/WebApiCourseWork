const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const config = require('config')
let mongoose = require('mongoose')

const port = process.env.PORT || config.get('app.port') 

const app = express()

const authRoute = require('./routes/auth')
const orderRoute = require('./routes/order')
const otpRoute = require('./routes/otp')

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use('/api/auth',authRoute)
app.use('/api/order',orderRoute)
app.use('/api/otp',otpRoute)
// app.use('/api/product',productRoute)
// app.use('/api/vendor',vendorRoute)

app.listen(port,()=>{
    console.log("Running on port: "+port)
    try{
        mongoose.connect(`mongodb://${config.get("mongodb.host")}:${config.get("mongodb.port")}/${config.get("mongodb.database")}`, 
        {useNewUrlParser: true, useUnifiedTopology: true})
        console.log("Connected to mongodb database")
    }catch(e){
        console.log("Unable to connect to the mongodb database")
    }
})
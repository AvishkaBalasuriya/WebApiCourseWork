const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const config = require('config')
const mongoose = require('mongoose')
const path = require('path')

const port = process.env.PORT || config.get('app.port') 

const app = express()

const authRoute = require('./routes/auth')
const otpRoute = require('./routes/otp')
const productRoute = require('./routes/product')
const vendorRoute = require('./routes/vendor')

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"))

app.use('/api/v1/auth',authRoute)
app.use('/api/v1/otp',otpRoute)
app.use('/api/v1/products',productRoute)
app.use('/api/v1/vendor',vendorRoute)

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "app/public", "index.html"))
})

app.listen(port,()=>{
    console.log("Running on port: "+port)
    try{
        console.log(`mongodb+srv://${config.get("mongodb.user")}:${config.get("mongodb.password")}@${config.get("mongodb.host")}/${config.get("mongodb.database")}?retryWrites=true&w=majority`)

        mongoose.connect(`mongodb+srv://${config.get("mongodb.user")}:${config.get("mongodb.password")}@${config.get("mongodb.host")}/${config.get("mongodb.database")}?retryWrites=true&w=majority`, 
        {useNewUrlParser: true, useUnifiedTopology: true})
        
        console.log("Connected to mongodb database")
    }catch(e){
        console.log("Unable to connect to the mongodb database")
    }
})
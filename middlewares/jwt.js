const configs = require('config')
const jwtrsa = configs.get('accessTokens.jwtRsa')
const jwt = require('jsonwebtoken')

function checkJWT(req, res, next) {
    try{
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]

        if (!token) {
            return res.status(403).send({
                "success": false,
                "message": "Missing JWT header in the request",
                "data": null
            })
        } 
    
        jwt.verify(token, jwtrsa, (err, data) => {
            if (err) {
                return res.status(403).send({
                    "success": false,
                    "message": "JWT authentication failed", 
                    "data": null
                })
            } 
            
            next()
        })
    }catch(e){
        console.log(e.message)
        return res.status(500).send({
            "success": false,
            "message": e.message, 
            "data": null
        })
    }
}

exports.checkJWT=checkJWT

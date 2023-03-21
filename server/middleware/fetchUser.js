const jwt = require('jsonwebtoken')

const validateToken = async (req, res, next) => {
    const authToken = req.header("authToken");

    if (!authToken) {
        return res.status(401).json({ error: "User not authenticated !" })
    }
    try {
        // let user = await jwt.verify(accessToken, JWT_SECRET)
        // req.user = user.id
        jwt.verify(authToken,"JwtSecretKey",(err,user)=>{
            if(err) return res.status(403).json("Something wrong in token authentication")
            req.user = user
            next()

        })

    } catch (err) {
        res.status(401).send("Invalid Token authentication")
    }
}

module.exports = validateToken

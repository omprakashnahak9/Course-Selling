require('dotenv').config();
const jwt = require('jsonwebtoken');
const JWT_USER_SECRET = process.env.JWT_USER_SECRET;

const userAuth = (req,res,next)=>{
    const token = req.cookies.token;

    if(!token){
        return res.status(401).send("Access denied. No token provided.");
    }

    try{
        const decoding = jwt.decode(token,JWT_USER_SECRET);
        req.userId = decoding.id;
        next();
    }catch(err){
        res.status(403).send("Invalid token.");
    }
}


module.exports = { JWT_USER_SECRET , userAuth};
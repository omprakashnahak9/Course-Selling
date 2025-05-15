require('dotenv').config();
const jwt = require('jsonwebtoken');
const JWT_ADMIN_SECRET = process.env.JWT_ADMIN_SECRET;


const adminAuth = (req,res,next)=>{
    const token = req.cookies.token;
    if(!token){
       return res.send("Unauthorized");
    }
    try{
        const check = jwt.decode(token,JWT_ADMIN_SECRET);
        req.adminId = check.id;
        next();
    }catch(err){
       return res.send("invalid credential");
    }
}



module.exports = { JWT_ADMIN_SECRET , adminAuth}
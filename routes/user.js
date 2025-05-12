const { Router } = require('express');
const userRoutes = Router();

//User Signup
userRoutes.post('/signup',(req,res)=>{

})

//User Signin
userRoutes.get('/signin',(req,res)=>{

})

//User Purchase
userRoutes.get('/purchase',(req,res)=>{

})

//Exporting the User Routes
module.exports = {
    userRoutes : userRoutes,
}
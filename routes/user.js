const { Router } = require('express');
const userRoutes = Router();

const bcrypt = require('bcrypt');
const { userModel } = require('../models/userData');

const jwt = require('jsonwebtoken');
const { JWT_USER_SECRET , userAuth } = require('../auth/userAuth');
const { purchaseModel } = require('../models/purchaseData');
const { courseModel } = require('../models/courseData');

userRoutes.get('/signup',(req,res)=>{
    res.render('userSignup.ejs');
})
//User Signup
userRoutes.post('/signup', async(req,res)=>{
    const { email , password , firstName , lastName } = req.body;

    const checking = await userModel.findOne({email});
    if(checking){
        res.status(401).send("This email is already exits so try to login or try signup with another email")
    }
    try{
        const hashPassword = await bcrypt.hash(password,10);
        await userModel.create({
            email : email,
            password : hashPassword,
            firstName : firstName,
            lastName : lastName,
        })
        res.send("Done you succesfully signup");
    }
    catch(err){
        return res.status(400).send("Bad gateway");
    }
})

//For loading the user signing page
userRoutes.get('/signin',(req,res)=>{
    res.render('userSignin.ejs');
})


//User Signin
userRoutes.post('/signin',async (req,res)=>{
    const { email , password } = req.body;
    
    const accCheck = await userModel.findOne({email});

    if(accCheck){
        //Checking the password in our database
        const passChecking = await bcrypt.compare(password,accCheck.password);
        if(passChecking){
            const token = await jwt.sign({id: accCheck._id.toString()},JWT_USER_SECRET);
            res.cookie('token',token);
            res.send("Signin sucessfully");
            
        }else{
            return res.status(401).send("Incorrect Credentials");
        }
    }
    else{
        return res.status(400).send('user didnt exists');
    }
})

//User Purchase
userRoutes.get('/purchases',userAuth,async(req,res)=>{
    const userId = req.userId;
   try{
    const purch = await purchaseModel.find({userId});
    const courses = await courseModel.find({
        _id:{$in: purch.map(x=>x.courseId)}
    })
    res.send(courses);
   }catch(err){
    res.send("no courses purchased");
   }
})

//Purchasing the course
userRoutes.get('/purchase',(req,res)=>{
    res.render('purchase.ejs')
})


userRoutes.post('/purchase',userAuth,async(req,res)=>{
    const userId = req.userId;
    const courseId = req.body.courseId;

    try{
        const coursePur = await purchaseModel.create({
            userId : userId,
            courseId : courseId
        })
        res.send("Done");
    }catch(err){
        res.send("Something wrong");
    }
    
})

//Exporting the User Routes
module.exports = {
    userRoutes : userRoutes,
}
const { Router } = require('express');
const adminRoutes = Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {JWT_ADMIN_SECRET} = require('../auth/adminAuth');
const cookieParser = require('cookie-parser');
adminRoutes.use(cookieParser());

const { adminModel } = require('../models/adminData');
const { adminAuth } = require('../auth/adminAuth');
const { courseModel } = require('../models/courseData');

//Admin page
adminRoutes.get('/signup',(req,res)=>{
    res.render("adminSignup.ejs");
});

//Admin Signup
adminRoutes.post('/signup',async(req,res)=>{
    const { email , password , firstName , lastName } = req.body;
    try{
        const hashedPassword = await bcrypt.hash(password,10);
        await adminModel.create({
            email : email,
            password : hashedPassword,
            firstName : firstName,
            lastName : lastName,
        })

        res.send("Signup successfully as a admin");
    }catch(err){
        res.send("email already in the data base");
    }

});

//Admin Signin page rendering
adminRoutes.get('/signin',(req,res)=>{
    res.render('adminSignin.ejs');
});

//Admin Signin
adminRoutes.post('/signin',async(req,res)=>{
    const { email , password } = req.body;

    const check = await adminModel.findOne({email});
    if(check){
        const checkPass = await bcrypt.compare(password,check.password);
        if(checkPass){
            
            const token = await jwt.sign({id : check._id.toString()},JWT_ADMIN_SECRET);
            res.cookie('token',token);
            res.send("done you are succesfully sigin");
        }else{
            res.send("Wrong Credentials");
        }
    }else{
        res.send("wrong credentials");
    }
});
  
//Admin
adminRoutes.get('/admin',adminAuth,(req,res)=>{
    res.send("jii")
});
adminRoutes.get('/create/courses',(req,res)=>{
    res.render('createCourse.ejs');
})
adminRoutes.post('/create/courses',adminAuth,async(req,res)=>{
    const adminId = req.adminId;

    const { title , description , imageurl , price} = req.body;

    const Course = await courseModel.create({
        title : title,
        description : description,
        price : price,
        image : imageurl,
        creatorId : adminId,
    })

    res.json({
        message : "Course Created",
        courseId : Course._id,
    })

});

adminRoutes.get('/update/course',(req,res)=>{
    res.render('updateCourse.ejs');
})

adminRoutes.post('/update/course',adminAuth,async(req,res)=>{
    const adminId = req.adminId;

    const { title , description , imageurl , price , courseId} = req.body;
    try{
         const Course = await courseModel.updateOne({
        _id: courseId,
        creatorId : adminId,
    },{
        title : title, 
        description : description,
        imageurl : imageurl,
        price : price,
    })
    res.send("done");
    }catch(err){
        res.send(
            "Something is wrong"
        )
    }
    
})

adminRoutes.get('/courses',adminAuth,async (req,res)=>{
    const adminId = req.adminId;

    const courses = await courseModel.find({
        creatorId : adminId,
    })

    res.send({
        courses
    });
})

module.exports = {
    adminRoutes : adminRoutes,
};
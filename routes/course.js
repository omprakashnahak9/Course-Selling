const { Router } = require('express');
const { courseModel } = require('../models/courseData');
const { userAuth } = require('../auth/userAuth');
const { purchaseModel }  = require('../models/purchaseData');
const courseRoutes = Router();


//Course Preview
courseRoutes.get('/',async(req,res)=>{
    try{
        const courses = await courseModel.find({});
        res.send(courses);
    }catch{
        res.send("something went wrong");
    }
   
})

module.exports = {
    courseRoutes : courseRoutes,
}
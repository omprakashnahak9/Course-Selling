const { Router } = require('express');
const courseRoutes = Router();



//Course Purchase 
courseRoutes.post('/course/purchase',(req,res)=>{
    res.json({
        "msg" : "This is the purchase route of course page",
    })
})

//Course Preview
courseRoutes.get('/course/preview',(req,res)=>{

})

module.exports = {
    courseRoutes : courseRoutes,
}
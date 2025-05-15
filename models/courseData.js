const { mongoose } = require('../config/mongoose');



const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const Course = new Schema({
    courseId : {type : ObjectId},
    title : String,
    description : String,
    price : Number,
    image : String,
    creatorId : {type : ObjectId},
});


const courseModel = mongoose.model('courses',Course);

module.exports = {
    courseModel : courseModel,
}

const { mongoose } = require('../config/mongoose');


const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const Admin = new Schema ({
    adminId : {type : ObjectId},
    email : {type : String , unique : true},
    password : String,
    firstName : String,
    lastName : String,
})

const adminModel = mongoose.model('admins',Admin);

module.exports = {
    adminModel : adminModel,
};
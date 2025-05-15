const { mongoose } = require('../config/mongoose');

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const User = new Schema({
    userId : {type : ObjectId },
    email : {type: String , unique : true},
    password : String,
    firstName : String,
    lastName : String,
});

const userModel = mongoose.model('users',User);

module.exports = {
    userModel : userModel,
};
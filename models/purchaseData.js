const mongoose = require('../config/mongoose');


const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const Purchase = new Schema({
    userId : {type : ObjectId , ref : 'users'},
    courseId : {type : ObjectId , ref : 'courses'},
    
},{ timestamps: true })

const purchaseModel = mongoose.model('purchases',Purchase);

module.exports = {
    purchaseModel : purchaseModel,
}


const {mongoose} = require('../config/mongoose');


const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const Purchase = new Schema({
    userId : {type : ObjectId },
    courseId : {type : ObjectId},
    
},{ timestamps: true })

const purchaseModel = mongoose.model('purchases',Purchase);

module.exports = {
    purchaseModel : purchaseModel,
}


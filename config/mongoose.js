
require('dotenv').config();

const mongoose = require('mongoose');
const dbPassword = process.env.DB_PASSWORD;


mongoose.connect(`mongodb+srv://omprakashbytix:${dbPassword}@testing1.znohucg.mongodb.net/Course-Selling`)
    .then(()=>console.log('MongoDB connected'))
    .catch((err)=>console.log('MongoDB not connected : ' ,err));



module.exports = {
    mongoose : mongoose,
}
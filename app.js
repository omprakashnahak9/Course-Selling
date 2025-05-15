const express = require('express');
const jwt = require('jsonwebtoken');
const { userRoutes } = require('./routes/user');
const { adminRoutes } = require('./routes/admin');
const { courseRoutes } = require('./routes/course');
const cookieParser = require('cookie-parser');

const path = require('path');

const app = express();


app.set('view engine','ejs');
app.use(express.urlencoded({extended : true}));
app.use(express.static(path.join(__dirname,'public')));
app.use(express.json());
app.use(cookieParser());
//User Routes
app.use('/user' , userRoutes);

//Admin Routes
app.use('/admin' , adminRoutes);

//Course Routes
app.use('/course', courseRoutes);

app.listen(3000);

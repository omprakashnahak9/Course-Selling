const express = require('express');
const jwt = require('jsonwebtoken');
const { userRoutes } = require('./routes/user');



const app = express();




app.use('/user' , userRoutes);

app.listen(3000);

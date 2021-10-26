const express = require('express');
const cookieParser = require('cookie-parser');
const port = 8000;
const app = express();
//const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const {urlencoded} = require("express");

app.use(express.urlencoded());
app.use(cookieParser());
//use express router

app.use('/', require('./routes'));

app.set('view engine','ejs');
app.set('views','./views');

app.listen(port, function (err){
    if(err){
        console.log(`Error : ${port}`);
    }
    console.log(`Server running on port : ${port}`);
})
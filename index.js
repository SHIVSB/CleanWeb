const express = require('express');
const cookieParser = require('cookie-parser');
const port = 8000;
const app = express();
//const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy')
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

const {urlencoded} = require("express");

app.use(express.urlencoded());
app.use(cookieParser());

app.set('view engine','ejs');
app.set('views','./views');

//part of passport
app.use(session({
    name: 'CleanWeb',
    //Todo change the secret before production
    secret: 'something',
    saveUninitialized: false,
    cookie: {
        maxAge: (1000*60*100)
    }
}));

app.use(passport.initialize());
app.use(passport.session());
app.use('/',passport.setAuthenticatedUser);
//use express router

app.use('/', require('./routes'));


app.listen(port, function (err){
    if(err){
        console.log(`Error : ${port}`);
    }
    console.log(`Server running on port : ${port}`);
})
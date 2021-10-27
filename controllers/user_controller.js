const Users = require('../models/users');

module.exports.profile = function(req,res){
    return res.render('user_profile',{
        title: 'User Profile'
    })
}

module.exports.signUp = function (req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_up',{
        title: "CleanWeb | Sign Up ......."
    })

}

module.exports.signIn = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_in',{
        title:"CleanWeb | Sign In ......."
    })
}
//to get sign up data
module.exports.create = function(req,res){
    if(req.body.password != req.body.confirmPassword){
        return res.redirect('back');
    }
    Users.findOne({email: req.body.email}, function(err, user){
        if(err){
            console.log("Error in finding user in signing up");
            return
        }
        if(!user) {
            Users.create(req.body, function (err, user) {
                if (err) {
                    console.log("Error in finding user in signing up");
                    return
                }
                return res.redirect('/users/sign-in')
            })
        }else{
            return res.redirect('back');
        }
    })

}
//sign in and create a session for the user
module.exports.createSession = function (req,res){
    return res.redirect('/');
}

module.exports.destroySession = function(req,res){
    req.logout();
    return res.redirect('/');
}
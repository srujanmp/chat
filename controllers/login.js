const database=require('../database/database');
const User=require('../models/userModel');

module.exports.getLoginPage=(req,res,next)=>{
    if(req.session.user!==undefined){
        return res.redirect('/');
    }
    return res.render('login',{pageTitle:"Login",infobox:""});
}


module.exports.postLoginPage=async(req,res,next)=>{
    const username=req.body.username;
    const password=req.body.password;
    database(connect=>{
        User.findOne({username: username}).then(user=>{
            //user not found=>create user
            if(!user){
                const newUser=new User({username:username,password:password});
                newUser.save();
                req.session.user=username;
                return res.redirect('/');
            }
            //user aldready exists and password not match
            else if(user.password!==password){
                return res.render('login',{pageTitle:"Login",infobox:'wrong password or user aldready exists'});
    
            }
            //user aldready exists and password matched
            else{ 
                req.session.user=username;
                return res.redirect('/');
            }
        }).catch(err=>{console.log(err);});      
    });
}


module.exports.logout=(req,res,next)=>{
    req.session.user=undefined;
    res.redirect('/login');
}


module.exports.postRandomUser=async(req,res,next)=>{
    database((connect)=>{
        let NewUser=new User({username:"srujan",password:"123"});
        NewUser.save();
    });
}
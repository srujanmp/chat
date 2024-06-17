const database=require('../database/database');
const Message=require('../models/chatModel');
const User=require('../models/userModel');

module.exports.getAdmin=(req,res,next)=>{
    if(req.session.user!=='admin'){
        return res.redirect('/');
    }
    else{
        database(db=>{
            User.find().then(users=>{
                Message.find().then(messages=>{
                    return res.render('admin',{pageTitle:'Admin',users:users,messages:messages,user:req.session.user});
                });
                
            }).catch();
        })
    }
    
}
module.exports.postDeleteUser=(req,res,next)=>{
    
    database(db=>{
        User.findOneAndDelete({username:req.body.user}).then().catch();
        Message.deleteMany({username:req.body.user}).then().catch();
        req.session.user=undefined;
        return res.redirect('/admin');
    });
}
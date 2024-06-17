const database=require('../database/database');
const Message=require('../models/chatModel');
const User=require('../models/userModel');

module.exports.postDeleteUser=(req,res,next)=>{
    database(db=>{
        User.findOneAndDelete({username:req.session.user}).then().catch();
        Message.deleteMany({username:req.session.user}).then().catch();
        req.session.user=undefined;
        return res.redirect('/login');
    });
}
module.exports.getChat=(req,res,next)=>{
    if(req.session.user===undefined){
        res.redirect('/login');
    }
    database(connect=>{
        User.findOne({username:req.session.user}).then(founduser=>{
            
            if(founduser===null){
                req.session.user=undefined;
                return res.redirect('/login');
            }
            else{
                Message.find().then(messages=>{
            
                    return res.render('chat',{pageTitle:'Chat',user:req.session.user,messages:messages.reverse()});
                }).catch(err=>{console.log(err);}); 
            }
        })
        
        
    });
    
};
module.exports.postMessage=(req,res,next)=>{
    database(connect=>{
        const newmessage=new Message({username:req.session.user,message:req.body.message});
        newmessage.save();
    });
    res.redirect('/');
};
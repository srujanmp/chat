const database=require('../database/database');
const Message=require('../models/chatModel')

module.exports.getChat=(req,res,next)=>{
    if(req.session.user===undefined){
        res.redirect('/login');
    }
    database(connect=>{
        Message.find().then(messages=>{
            
            return res.render('chat',{pageTitle:'Chat',user:req.session.user,messages:messages.reverse()});
        }).catch(err=>{console.log(err);}); 
        
    });
    
};
module.exports.postMessage=(req,res,next)=>{
    database(connect=>{
        const newmessage=new Message({username:req.session.user,message:req.body.message});
        newmessage.save();
    });
    res.redirect('/');
};
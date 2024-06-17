const mongoose=require('mongoose'); 

const MessageSchema=new mongoose.Schema({
    username:String,
    message:String
},{ timestamps: true });

const Message=mongoose.model('Message',MessageSchema);


module.exports=Message;
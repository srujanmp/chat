const express=require('express');
const bodyParser=require('body-parser');
const cookieSession=require('cookie-session');
require('dotenv').config();
const app=express();

const loginRoute=require('./routes/login-route');
const chatRoute=require('./routes/chat-route');

app.set('view engine','ejs');
app.set('views',__dirname+'/views');

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(__dirname+'/public'))
app.use(cookieSession({keys:['key1','key2']}));

app.use(loginRoute);
app.use(chatRoute);
app.use('/',(req,res,next)=>{
    res.status(404);
    res.send("pagenotfound");
})

app.listen(3000);
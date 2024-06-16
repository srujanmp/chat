const router=require('express').Router();
const chatController=require('../controllers/chat.js')


router.get('/',chatController.getChat);
router.post('/postmessage',chatController.postMessage);

module.exports=router;
const router=require('express').Router();
const chatController=require('../controllers/chat.js')


router.get('/',chatController.getChat);
router.post('/postmessage',chatController.postMessage);
router.get('/deleteuser',chatController.postDeleteUser);

module.exports=router;
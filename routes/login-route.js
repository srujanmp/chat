const router=require('express').Router();
const loginController=require('../controllers/login.js')


router.get('/login',loginController.getLoginPage);

router.post('/login',loginController.postLoginPage);
router.get('/logout',loginController.logout);
module.exports=router;
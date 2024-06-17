const router=require('express').Router();
const adminController=require('../controllers/admin.js')


router.get('/admin',adminController.getAdmin);
router.post('/admin/deleteuser',adminController.postDeleteUser);

module.exports=router;
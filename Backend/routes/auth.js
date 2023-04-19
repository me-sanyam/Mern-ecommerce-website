const express = require('express');
const router = express.Router();

const { registeruser,
    loginuser,
    logoutuser,
    forgotpassword,
    resetPassword,
    getuserprofile,
    updatepassword,
    updateuserprofile,
    getallusers,
    getspecificuser,
    AdminUpdateUser,
    deleteUser,
    SendContactResponse
} = require("../controllers/authcontrollers")

const { isAuthenticatedUser, isAuthourizedRole } = require("../middlewares/authentication");

router.route('/register').post(registeruser);
router.route('/login').post(loginuser);
router.route('/password/forgot').post(forgotpassword);
router.route('/password/reset/:token').put(resetPassword);
router.route('/myprofile').get(isAuthenticatedUser, getuserprofile);
router.route('/myprofile/password/reset').put(isAuthenticatedUser, updatepassword);
router.route('/myprofile/update').put(isAuthenticatedUser, updateuserprofile);
router.route('/logout').get(isAuthenticatedUser, logoutuser);
router.route('/admin/users').get(isAuthenticatedUser, isAuthourizedRole("admin"), getallusers);
router.route('/admin/user/:id').get(isAuthenticatedUser, isAuthourizedRole("admin"), getspecificuser);
router.route('/admin/user/update/:id').put(isAuthenticatedUser, isAuthourizedRole("admin"), AdminUpdateUser);
router.route('/admin/user/remove/:id').delete(isAuthenticatedUser, isAuthourizedRole("admin"), deleteUser);

router.route('/contact/query').post(SendContactResponse);
module.exports = router;
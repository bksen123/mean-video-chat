const express = require("express");
const router = express.Router();
const Users = require("../controllers/usersController");
router.post("/saveUserInfo", Users.saveUserInfo);
router.post("/doSignup", Users.saveUserInfo);
router.post("/emailAlreadyExists", Users.emailAlreadyExists);
router.post("/doSignIn", Users.doSignIn);
router.get("/getUsersList", Users.getUsersList);
router.post('/authentication', Users.authentication);
router.get('/logout', Users.logout);
router.post('/searchUserData', Users.searchUserData);
router.post('/forgotPassword', Users.forgotPassword);
router.post('/getUserInfo', Users.getUserInfo);

module.exports = router;
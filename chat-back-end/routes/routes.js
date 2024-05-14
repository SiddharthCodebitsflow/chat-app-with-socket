const express = require("express");
// const multer = require('multer');
const router = express.Router();
const { register, login, getUser,user } = require('../Controller/UserController');
const { authenticateToken } = require("../Middleware/jwtVerify");


router.route("/register").post(register);
router.route("/login").post(login);
router.route("/get-user").get(authenticateToken, getUser);
router.route("/user").get(authenticateToken,user);

module.exports = router;
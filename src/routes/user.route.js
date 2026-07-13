const express = require('express');
const authController = require('../controllers/auth.controller')

const router = express.Router();

// route POST/api/user/register
router.post("/register",authController.UserRegistered);
// route POST/api/user/register
router.post("/login",authController.UserLogin);
// route POST/api/user/logout
router.post("/logout",authController.UserLogout)

module.exports= router
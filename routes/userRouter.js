const express = require('express');
const userRouter = express.Router();

const { handleLogin, handleSignup, handleLogout } = require('../controllers/userController');

userRouter.post('/login', handleLogin);

userRouter.post('/signup', handleSignup);

userRouter.post('/logout', handleLogout);

module.exports = userRouter;



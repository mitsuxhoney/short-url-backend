const express = require('express');
const userRouter = express.Router();

const { handleLogin, handleSignup } = require('../controllers/userController');

userRouter.post('/login', handleLogin);

userRouter.post('/signup', handleSignup);

module.exports = userRouter;



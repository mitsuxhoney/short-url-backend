const express = require('express');
const userRouter = express.Router();

const { handleLogin, handleSignup, handleLogout, handleProfileImageUpload } = require('../controllers/userController');
const { auth, authorize } = require('../middlewares/auth');

const upload = require('../middlewares/multer');

userRouter.post('/login', handleLogin);

userRouter.post('/signup', handleSignup);

userRouter.post('/logout', handleLogout);

userRouter.post('/profile-image', auth, authorize(["admin", "user"]), upload.single('file'), handleProfileImageUpload);

module.exports = userRouter;



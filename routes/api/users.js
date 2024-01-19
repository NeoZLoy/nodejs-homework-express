const express = require('express');

const {
    checkUniqueEmail, 
    checkToken, 
    uploadUserAvatar, 
    resizeUserAvatar, 
    saveUserAvatar, 
    verifyTokenChecker, 
    IsEmailVerifyed,
    isEmailEntered,
    isUserVerifyed
} = require('../../middlewares/user.middlewares');
const {
    registrateUser, 
    login, 
    logout, 
    getCurrentUser, 
    updateSubscription, 
    updateUserAvatar, 
    verifyUserEmail, 
    sendVerificationMessage
} = require('../../controllers/users.controller');

const userRouter = express.Router();

userRouter.post('/register', checkUniqueEmail, registrateUser );
userRouter.post('/login', IsEmailVerifyed, login);
userRouter.post('/logout', checkToken, logout);
userRouter.get('/current', checkToken, getCurrentUser);
userRouter.patch('/', checkToken, updateSubscription);
userRouter.patch('/avatars', checkToken, uploadUserAvatar, resizeUserAvatar, saveUserAvatar, updateUserAvatar);
userRouter.get('/verify/:verificationToken', verifyTokenChecker, verifyUserEmail );
userRouter.post('/verify', isEmailEntered, isUserVerifyed, sendVerificationMessage)


module.exports = userRouter;
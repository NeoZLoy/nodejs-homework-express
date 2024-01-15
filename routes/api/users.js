const express = require('express');

const {checkUniqueEmail, checkToken, uploadUserAvatar} = require('../../middlewares/user.middlewares');
const { registrateUser, login, logout, getCurrentUser, updateSubscription, updateUserAvatar } = require('../../controllers/users.controller');

const userRouter = express.Router();

userRouter.post('/register', checkUniqueEmail, registrateUser );
userRouter.post('/login', login);
userRouter.post('/logout', checkToken, logout);
userRouter.get('/current', checkToken, getCurrentUser);
userRouter.patch('/', checkToken, updateSubscription);
userRouter.patch('/avatars', checkToken, uploadUserAvatar, updateUserAvatar)


module.exports = userRouter;
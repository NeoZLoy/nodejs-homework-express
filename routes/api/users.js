const express = require('express');

const {checkUniqueEmail, checkToken} = require('../../middlewares/user.middlewares');
const { registrateUser, login, logout, getCurrentUser, updateUserByMyself } = require('../../controllers/users.controller');

const userRouter = express.Router();

userRouter.post('/register', checkUniqueEmail, registrateUser );
userRouter.post('/login', login);
userRouter.post('/logout', checkToken, logout);
userRouter.get('/current', checkToken, getCurrentUser);
userRouter.patch('/', checkToken, updateUserByMyself);


module.exports = userRouter;
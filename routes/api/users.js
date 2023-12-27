const express = require('express');

const {checkUniqueEmail} = require('../../middlewares/user.middlewares');
const { registrateUser, login } = require('../../controllers/users.controller');

const userRouter = express.Router();

userRouter.post('/register', checkUniqueEmail, registrateUser );
userRouter.post('/login', login)


module.exports = userRouter;
const express = require('express');

const {checkUniqueEmail} = require('../../middlewares/user.middlewares');
const { registrateUser } = require('../../controllers/users.controller');

const userRouter = express.Router();

userRouter.post('/register', checkUniqueEmail, registrateUser )


module.exports = userRouter;
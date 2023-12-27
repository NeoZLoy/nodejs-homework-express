const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const { createUserValidation } = require("../helpers/user.validator");
const { createUser, loginUser } = require("../services");
const { hashPwd } = require('../helpers/user.hash')


const registrateUser = async (req, res, next) => {
    try {
        const {value, error} = createUserValidation(req.body);

        if(error){
            return res.status(400).json({
                msg: error.details.map((detail) => detail.message)
            })
        }

        const hashed = await hashPwd(req.body.password)
        

        const result = await createUser({...value, password: hashed});

        return res.status(201).json({
            msg: 'Registration succesfull',
            user: { email: result.email, subscription: result.subscription }
        })
    } catch (error) {
        next(error)
    }
}

const login = async (req, res, next) => {
    try {
        const user = await loginUser(req.body)

        if(!user){
           return res.status(401).json({
                msg: "Email or password is wrong"
            })
        }

        bcrypt.compare(req.body.password, user.password, (err, result) => {
            if (err) {
              return res.status(401).json({
                msg: 'Unatorized!'
              })
            } else {
              if (result) {
                const key = process.env.key;
                console.log(user)
                user.token = jwt.sign({email: user.email, id: user.id} , key, { expiresIn: '1h' });
                return res.status(201).json({
                    msg: '++',
                    token: user.token
                })
            }
        }
        })


    } catch (error) {
        next(error)
    }
}

module.exports = {registrateUser, login}
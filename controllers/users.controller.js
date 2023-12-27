const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const { createUserValidation } = require("../helpers/user.validator");
const { createUser, findByEmail, findUserById  } = require("../services");
const { hashPwd } = require('../helpers/user.hash');
// const { findById } = require('../services/schemas/user.schema');
// const {User} = require('../services/schemas/user.schema');


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
        const user = await findByEmail(req.body.email)

        if(!user){
            return res.status(404).json({
                 msg: "User not found"
             })
         }

        bcrypt.compare(req.body.password, user.password, (err, result) => {
            if (err || !result) {
              return res.status(401).json({
                msg: "Email or password is wrong"
              })
            }
        })

        const key = process.env.key;
        const token = jwt.sign({email: user.email, id: user.id} , key, { expiresIn: '1h' });
        user.token = token;
        console.log(`LOGIN TOKEN: ${token}`)
        await user.save()
            return res.status(201).json({
            msg: '++',
            res: {token, user: {email: user.email, subscription: user.subscription}}
        })
        
    } catch (error) {
        next(error)
    }
}

const logout = async (req, res, next) => {
    try {
        const user = await findUserById(req.body.id);

        if(!user){
            res.status(401).json({
                msg: 'Not authorized'
            })
        }

        user.token = null;

        return res.status(204);

    } catch (error) {
        next(error)
    }
}


module.exports = {registrateUser, login, logout}
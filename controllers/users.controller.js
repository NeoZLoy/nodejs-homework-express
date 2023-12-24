const bcrypt = require('bcrypt');

const { createUserValidation } = require("../helpers/user.validator");
const { createUser } = require("../services");

const saltRounds = 10;


const registrateUser = async (req, res, next) => {
    try {
        const {value, error} = createUserValidation(req.body);

        if(error){
            return res.status(400).json({
                msg: error.details.map((detail) => detail.message)
            })
        }

        const pwd = value.password; 
        

        const result = await createUser({...value});

        return res.status(201).json({
            msg: 'Registration succesfull',
            user: result
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {registrateUser}
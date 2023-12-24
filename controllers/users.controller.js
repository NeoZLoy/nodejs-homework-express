const { createUserValidation } = require("../helpers/user.validator");
const { createUser } = require("../services");

const registrateUser = async (req, res, next) => {
    try {
        const {value, error} = createUserValidation(req.body);

        if(error){
            return res.status(400).json({
                msg: error.details.map((detail) => detail.message)
            })
        }

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
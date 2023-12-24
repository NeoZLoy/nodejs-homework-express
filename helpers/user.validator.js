const Joi = require('joi')

const createUserValidation = (userData) => {
    return Joi
    .object()
    .options({
        abortEarly: false
    })
    .keys({
        email:Joi.string().email(({ minDomainSegments: 1, tlds: { allow: ['com', 'net', 'ua'] } })).required(),
        password: Joi.string().required()
    }).validate(userData)
}

module.exports = {createUserValidation}
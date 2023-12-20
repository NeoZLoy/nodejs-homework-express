const Joi = require('joi')
const createContactValidator = (contactData) => {
    return Joi
        .object()
        .options({
            abortEarly: false
        })
        .keys({
            name:Joi.string().required().min(2),
            email:Joi.string().email(({ minDomainSegments: 1, tlds: { allow: ['com', 'net', 'ua'] } })).required(),
            phone:Joi.string().min(6).max(10).required()
        }).validate(contactData)
}


const updateContactValidator = (contactData) => {
    return Joi
        .object()
        .options({
            abortEarly: false
        })
        .keys({
            name:Joi.string().min(2),
            email:Joi.string().email(({ minDomainSegments: 1, tlds: { allow: ['com', 'net', 'ua'] } })),
            phone:Joi.string().min(6).max(10),
        }).validate(contactData)
}


module.exports = {createContactValidator, updateContactValidator}
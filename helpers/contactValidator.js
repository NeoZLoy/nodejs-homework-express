const Joi = require('joi')

const createContactValidator = (contactData) => {
    Joi
        .object()
        .options({
            abortEarly: false
        })
        .keys({
            name:Joi.string().required().min(2),
            mail:Joi.string().email(({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ua'] } })).required(),
            phone:Joi.string().min(6).max(10).required()
        }).validate(contactData)
}

const updateContactValidator = (contactData) => {
    Joi
    .object()
    .options({
        abortEarly: false
    })
    .keys({
        name: Joi.string().optional().min(2),
        mail:Joi.string().email(({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ua'] } })).optional(),
        phone:Joi.string().min(6).max(10).optional()
    }).validate(contactData)
}

module.exports = {createContactValidator, updateContactValidator}
const Joi = require("joi")

const contactCreateSchema = Joi.object({
    name:Joi.string().min(3).max(30).required(),
    email: Joi.string().email({ minDomainSegments: 2}).required(),
    phone: Joi.string().required()
})


const contactUpdateSchema = Joi.object({
    name:Joi.string().min(3).max(30),
    email: Joi.string().email({ minDomainSegments: 2}),
    phone: Joi.string()
})

module.exports = {contactCreateSchema, contactUpdateSchema}

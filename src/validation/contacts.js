import Joi from "joi";



export const createContactSchema = Joi.object ({
    name: Joi.string().min(3).max(20).required(),
    phoneNumber: Joi.string().min(3).max(20).required(),
    contactType: Joi.string().valid('personal', 'home', 'personal').required(),
    email: Joi.string().min(3).max(20),
    isFavourite: Joi.boolean(),
    age: Joi.number().integer().min(3).max(20),
});


export const updateContactSchema = Joi.object({
    name: Joi.string().min(3).max(20),
    phoneNumber: Joi.number().min(1).max(12),
    email:Joi.string().min(3).max(20),
    isFavourite: Joi.boolean(),
    contactType: Joi.string().valid('personal', 'home', 'personal'),
    age: Joi.number().integer().min(3).max(20),
});

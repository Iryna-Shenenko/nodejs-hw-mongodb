import Joi from "joi";



export const createContactSchema = Joi.object ({
    name: Joi.string().min(3).max(20).required(),
    phoneNumber: Joi.string().min(3).max(20).required(),
    contactType: Joi.string().valid('personal', 'home', 'work').required(),
    email: Joi.string().min(3).max(30),
    isFavourite: Joi.boolean(),
    age: Joi.number().integer().min(3).max(20),
});


export const updateContactSchema = Joi.object({
    name: Joi.string().min(3).max(20),
    phoneNumber: Joi.string().min(3).max(20),
    email:Joi.string().min(3).max(30),
    isFavourite: Joi.boolean(),
    contactType: Joi.string().valid('personal', 'home', 'work'),
    age: Joi.number().integer().min(3).max(20),
});

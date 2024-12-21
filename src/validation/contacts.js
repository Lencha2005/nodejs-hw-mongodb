import Joi from "joi";
import { numberRegex, typeList } from "../constants/contacts.js";



export const createContactSchema = Joi.object({
    "name": Joi.string().min(3).max(20).required().messages({
        'string.min': 'Username should have at least 3 characters',
        'string.max': 'Username should have at most 20 characters',
    }),
    "phoneNumber": Joi.string().pattern(numberRegex).min(3).max(20).required().messages({
        'string.pattern': 'Phone Number is not valid',
        'string.min': 'Phone Number should have at least 3 characters',
        'string.max': 'Phone Number should have at most 20 characters',
    }),
    "email": Joi.string().email().min(3).max(20).messages({
        'string.min': 'Email should have at least 3 characters',
        'string.max': 'Email should have at most 20 characters',
    }),
    "isFavourite": Joi.boolean(),
    "contactType": Joi.string().valid(...typeList).required(),
})

export const updateContactSchema = Joi.object({
    "name": Joi.string().min(3).max(20).messages({
        'string.min': 'Username should have at least 3 characters',
        'string.max': 'Username should have at most 20 characters',
    }),
    "phoneNumber": Joi.string().pattern(numberRegex).min(3).max(20).message({
        'string.pattern': 'Phone Number is not valid',
        'string.min': 'Phone Number should have at least 3 characters',
        'string.max': 'Phone Number should have at most 20 characters',
    }),
    "email": Joi.string().email().min(3).max(20).message({
        'string.min': 'Email should have at least 3 characters',
        'string.max': 'Email should have at most 20 characters',
    }),
    "isFavourite": Joi.boolean(),
    "contactType": Joi.string().valid(...typeList),

})

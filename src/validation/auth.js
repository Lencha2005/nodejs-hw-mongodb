import Joi from "joi";
import { emailRegex } from "../constants/index.js";

export const registerSchema = Joi.object({
name: Joi.string().min(3).max(30).required(),
email: Joi.string().pattern(emailRegex).required(),
password: Joi.string().min(6).required(),
});

export const loginSchema = Joi.object({
    email: Joi.string().pattern(emailRegex).required(),
    password: Joi.string().min(6).required(),
});

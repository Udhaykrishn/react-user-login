import Joi from "joi"



export const UserJoiSchema = Joi.object({
    username: Joi.string().min(1).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    role: Joi.string().valid("user", "admin").optional(),
    isBlocked: Joi.boolean().optional(),
    photo: Joi.string().uri().optional(),
}) 

export const userUpdateJoiSchema = Joi.object({
	username:Joi.string().optional().min(4),
	email: Joi.string().email().optional(),
	password: Joi.string().min(8).optional(),
    role: Joi.string().valid("user", "admin").optional(),
    isBlocked: Joi.boolean().optional(),
    photo: Joi.string().uri().optional(),
});

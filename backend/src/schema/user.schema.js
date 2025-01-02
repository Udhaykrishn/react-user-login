import Joi from "joi";


export const UserJoiSchema = Joi.object({
  username: Joi.string()
    .min(1)
    .max(50)
    .messages({
      'string.empty': 'Username is required and cannot be empty.',
      'string.min': 'Username must be at least 1 character long.',
      'string.max': 'Username cannot exceed 50 characters.',
      'any.required': 'Username is a required field.',
    }),
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.empty': 'Email is required and cannot be empty.',
      'string.email': 'Please provide a valid email address.',
      'any.required': 'Email is a required field.',
    }),
  password: Joi.string()
    .min(8)
    .required()
    .messages({
      'string.empty': 'Password is required and cannot be empty.',
      'string.min': 'Password must be at least 8 characters long.',
      'any.required': 'Password is a required field.',
    }),
  role: Joi.string()
    .valid("user", "admin")
    .optional()
    .messages({
      'any.only': 'Role must be either "user" or "admin".',
    }),
  isBlocked: Joi.boolean()
    .optional()
    .messages({
      'boolean.base': 'isBlocked must be a boolean value.',
    }),
  photo: Joi.string()
    .uri()
    .optional()
    .messages({
      'string.uri': 'Photo must be a valid URI.',
    }),
});

// Schema for updating a user with custom error messages
export const userUpdateJoiSchema = Joi.object({
  username: Joi.string()
    .min(4)
    .optional()
    .messages({
      'string.empty': 'Username cannot be empty.',
      'string.min': 'Username must be at least 4 characters long.',
    }),
  email: Joi.string()
    .email()
    .optional()
    .messages({
      'string.email': 'Please provide a valid email address.',
    }),
  password: Joi.string()
    .min(8)
    .optional()
    .messages({
      'string.empty': 'Password cannot be empty.',
      'string.min': 'Password must be at least 8 characters long.',
    }),
  role: Joi.string()
    .valid("user", "admin")
    .optional()
    .messages({
      'any.only': 'Role must be either "user" or "admin".',
    }),
  isBlocked: Joi.boolean()
    .optional()
    .messages({
      'boolean.base': 'isBlocked must be a boolean value.',
    }),
  photo: Joi.string()
    .uri()
    .optional()
    .messages({
      'string.uri': 'Photo must be a valid URI.',
    }),
});

import Joi from 'joi';

export const adminJoiSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'Email must be a valid email address.',
      'string.empty': 'Email is required.',
      'any.required': 'Email is required.',
    }),
  password: Joi.string()
    .min(8)
    .required()
    .messages({
      'string.min': 'Password must be at least 8 characters long.',
      'string.empty': 'Password is required.',
      'any.required': 'Password is required.',
    }),
});

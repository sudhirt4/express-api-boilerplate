import Joi from 'joi';

export const USER_SCHEMA = {
  firstName: Joi.string()
    .max(30)
    .required(),
  lastName: Joi.string()
    .max(30)
    .required(),
  email: Joi.string()
    .email()
    .max(50)
    .required(),
  password: Joi.required()
};

export const create = {
  user: USER_SCHEMA
};

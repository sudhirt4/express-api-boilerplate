import Joi from "joi";

export const login = {
  email: Joi.string()
    .email()
    .max(50)
    .required(),
  password: Joi.required()
};

import Joi from 'joi';

export function validate(data, schema, options = {}) {
  options = {
    ...options,
    abortEarly: false
  };

  return Joi.validate(data, schema, options, err => {
    if (err) {
      return Promise.reject(err);
    }

    return Promise.resolve(null);
  });
}

import * as schema from './schemas';
import * as validator from '../../utils/validator';

export function login(req, res, next) {
  return validator
    .validate(req.body, schema.login)
    .then(() => next())
    .catch(err => next(err));
}

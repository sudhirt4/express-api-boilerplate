import * as authSchema from './schemas';
import * as validator from '../../utils/validator';

export function login(req, res, next) {
  const user = req.body;

  return validator
    .validate(user, authSchema.login)
    .then(() => next())
    .catch(err => next(err));
}

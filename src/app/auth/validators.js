import * as AuthSchema from '../../common/schemas/auth';
import * as validator from '../../utils/validator';

export function login(req, res, next) {
  return validator
    .validate(req.body, AuthSchema.login)
    .then(() => next())
    .catch(err => next(err));
}

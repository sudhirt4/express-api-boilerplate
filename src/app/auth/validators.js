import * as AuthSchema from '../../common/schemas/auth';
import * as validator from '../../common/utils/validator';

export function login(req, res, next) {
  try {
    validator.validate(req.body, AuthSchema.login);
    next();
  } catch (err) {
    next(err);
  }
}

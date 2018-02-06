import * as UsersSchema from '../../common/schemas/users';
import * as validator from '../../utils/validator';

export function create(req, res, next) {
  return validator
    .validate(req.body, UsersSchema.create)
    .then(() => next())
    .catch(err => next(err));
}

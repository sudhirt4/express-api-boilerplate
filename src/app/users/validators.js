import * as UsersSchema from '../../common/schemas/users';
import * as validator from '../../common/utils/validator';

export function create(req, res, next) {
  let schema = UsersSchema.create;
  delete schema.user.confirmPassword;

  try {
    validator.validate(req.body, schema);
    next();
  } catch (err) {
    next(err);
  }
}

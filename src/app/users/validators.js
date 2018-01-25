import * as schema from './schemas';
import * as validator from '../../utils/validator';

export function create(req, res, next) {
  const user = req.body;

  return validator
    .validate(user, schema.create)
    .then(() => next())
    .catch(err => next(err));
}

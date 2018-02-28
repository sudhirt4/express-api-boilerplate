import * as validator from '../../common/utils/validator';

export function create(req, res, next) {
  try {
    validator.validate(req.body, {});
    next();
  } catch (err) {
    next(err);
  }
}

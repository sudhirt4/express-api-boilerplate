import * as ItemSchema from '../../common/schemas/items';
import * as validator from '../../common/utils/validator';

export function create(req, res, next) {
  try {
    validator.validate(req.body, ItemSchema.create);
    next();
  } catch (err) {
    next(err);
  }
}

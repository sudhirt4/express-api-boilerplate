import * as schema from "./schemas";
import * as validator from "../../utils/validator";

export function create(req, res, next) {
  return validator
    .validate(req.body, schema.create)
    .then(() => next())
    .catch(err => next(err));
}

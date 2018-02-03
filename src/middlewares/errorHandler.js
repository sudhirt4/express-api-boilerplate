import { buildError } from '../utils/errorHandler';
import HttpStatus from '../constants/httpStatus';

export function generic(err, req, res, next) {
  if (err.stack) {
    // logger.debug('Error stack trace: ', err.stack);
  }

  let error = buildError(err);
  res.status(error.code).json({ ...error });
}

export function notAllowed(req, res, next) {
  res.status(HttpStatus.METHOD_NOT_ALLOWED.code).json({
    code: HttpStatus.METHOD_NOT_ALLOWED.code,
    message: HttpStatus.METHOD_NOT_ALLOWED.message
  });
}

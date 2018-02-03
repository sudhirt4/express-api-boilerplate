import HttpStatus from '../constants/httpStatus';
import MESSAGES from '../constants/messages';
import * as joiValidationUtils from './joiValidation';

export function buildError(err) {
  if (err.isJoi) {
    return {
      code: HttpStatus.BAD_REQUEST.code,
      message: MESSAGES.VALIDATION_ERROR,
      details: err.details && joiValidationUtils.normalizeErrors(err)
    };
  }

  // HTTP errors
  if (err.isBoom) {
    return {
      code: err.output.statusCode,
      message: err.output.payload.message || err.output.payload.error
    };
  }

  return {
    code: HttpStatus.INTERNAL_SERVER_ERROR.code,
    message: HttpStatus.INTERNAL_SERVER_ERROR.message
  };
}

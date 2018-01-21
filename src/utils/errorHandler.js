import HttpStatus from '../constants/httpStatus';

export function buildError(err) {
  if (err.isJoi || err instanceof SyntaxError) {
    return {
      code: HttpStatus.BAD_REQUEST.code,
      message: HttpStatus.BAD_REQUEST.message,
      details:
        err.details &&
        err.details.map(err => {
          return {
            message: err.message,
            param: err.path
          };
        })
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

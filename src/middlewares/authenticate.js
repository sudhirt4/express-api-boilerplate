// import { buildError } from "../utils/errorHandler";
// import HttpStatus from "../constants/httpStatus";
import Boom from "boom";

import * as TokenUtils from "../utils/token";
import MESSAGES from "../constants/messages";

export function authenticate(req, res, next) {
  const accessToken = req.get("authorization");
  try {
    const decoded = TokenUtils.verifyAccessToken(accessToken);
    res.locals.user = decoded.encryptedData;
    next();
  } catch (err) {
    throw Boom.unauthorized(MESSAGES.INVALID_TOKEN);
  }
}

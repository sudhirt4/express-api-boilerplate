import Boom from "boom";

import * as TokenUtils from "../utils/token";
import MESSAGES from "../constants/messages";
import { AuthDevice } from "../models";

export async function authenticate(req, res, next) {
  const accessToken = req.get("authorization");
  try {
    const decoded = TokenUtils.verifyAccessToken(accessToken);
    const deviceId = decoded.data.id;

    res.locals.user = decoded.data.payload;
    res.locals.deviceId = deviceId;

    AuthDevice.update({ lastUsedAt: new Date() }, { where: { id: deviceId } });

    next();
  } catch (err) {
    throw Boom.unauthorized(MESSAGES.INVALID_TOKEN);
  }
}

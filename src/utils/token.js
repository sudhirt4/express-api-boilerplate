import jwt from 'jsonwebtoken';

import { ACCESS_TOKEN_SALT, ACCESS_TOKEN_EXPIRY, REFRESH_TOKEN_SALT, REFRESH_TOKEN_EXPIRY } from '../constants/token';

function getUnixTimeStamp(date) {
  return Math.floor(date / 1000);
}

export function generateAuthTokens(encryptedData, options = {}) {
  let { skipRefresh, deviceId } = options;
  let accessTokenExpiry = parseInt(ACCESS_TOKEN_EXPIRY) * 60;

  let accessToken = jwt.sign(
    {
      data: { payload: encryptedData, id: deviceId },
      exp: getUnixTimeStamp(Date.now()) + accessTokenExpiry
    },
    ACCESS_TOKEN_SALT
  );

  if (skipRefresh) {
    return { access: accessToken };
  }

  let refreshToken = jwt.sign(
    {
      data: { payload: encryptedData, id: deviceId }
    },
    REFRESH_TOKEN_SALT
  );

  return { access: accessToken, refresh: refreshToken };
}

export function verifyAccessToken(jwtToken) {
  return jwt.verify(jwtToken, ACCESS_TOKEN_SALT);
}

export function verifyRefreshToken(jwtToken) {
  return jwt.verify(jwtToken, REFRESH_TOKEN_SALT);
}

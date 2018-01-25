import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_SALT, ACCESS_TOKEN_EXPIRY, REFRESH_TOKEN_SALT, REFRESH_TOKEN_EXPIRY } from '../constants/token';

export function generateAuthTokens(encryptedData) {
  let accessToken = jwt.sign({ encryptedData }, ACCESS_TOKEN_SALT, { expiresIn: ACCESS_TOKEN_EXPIRY });
  let refreshToken = jwt.sign({ encryptedData }, REFRESH_TOKEN_SALT, { expiresIn: REFRESH_TOKEN_EXPIRY });

  return { accessToken, refreshToken };
}

import jwt from "jsonwebtoken";
import {
  ACCESS_TOKEN_SALT,
  ACCESS_TOKEN_EXPIRY,
  REFRESH_TOKEN_SALT,
  REFRESH_TOKEN_EXPIRY
} from "../constants/token";

function getUnixTimeStamp(date) {
  return Math.floor(date / 1000);
}

export function generateAuthTokens(encryptedData) {
  let accessTokenExpiry = parseInt(ACCESS_TOKEN_EXPIRY) * 60;
  let accessToken = jwt.sign(
    {
      data: encryptedData,
      exp: getUnixTimeStamp(Date.now()) + accessTokenExpiry
    },
    ACCESS_TOKEN_SALT
  );

  let refreshTokenExpiry = parseInt(REFRESH_TOKEN_EXPIRY) * 60;
  let refreshToken = jwt.sign(
    {
      data: encryptedData,
      exp: getUnixTimeStamp(Date.now()) + refreshTokenExpiry
    },
    REFRESH_TOKEN_SALT
  );

  return { accessToken, refreshToken };
}

export function verifyAccessToken(jwtToken) {
  return jwt.verify(jwtToken, ACCESS_TOKEN_SALT);
}

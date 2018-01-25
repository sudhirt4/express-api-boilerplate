import Boom from 'boom';

import models from '../../models';
import * as crypt from '../../utils/crypt';
import * as tokenUtils from '../../utils/token';

const { User } = models;

export async function login(userParams) {
  let user = await User.fetchByEmail(userParams.email);
  if (!user) {
    throw Boom.badRequest(User.CONSTRAINTS.INVALID_CRED.message);
  }
  let userJSON = user.responseJSON();

  let matchPassword = await crypt.compare(userParams.password, user.get('password'));
  if (!matchPassword) {
    throw Boom.badRequest(User.CONSTRAINTS.INVALID_CRED.message);
  }

  let tokens = tokenUtils.generateAuthTokens(userJSON);

  return { tokens };
}

export async function logout() {
  return 'Logout';
}

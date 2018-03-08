import Boom from 'boom';
import uuidv4 from 'uuid/v4';

import models from '../models';
import * as crypt from '../utils/crypt';
import * as tokenUtils from '../utils/token';
import MESSAGES from '../constants/messages';

const { User, Role, AuthDevice } = models;

export async function login(params = {}, deviceParams = {}) {
  let user = await User.fetchByEmail(params.email, {
    include: [
      {
        model: Role,
        as: 'roles',
        through: { attributes: [] }
      }
    ]
  });

  if (!user) {
    throw Boom.badRequest(User.CONSTRAINTS.INVALID_CRED.message);
  }
  let userJSON = user.toJSON();
  delete userJSON.password;

  let matchPassword = await crypt.compare(params.password, user.get('password'));
  if (!matchPassword) {
    throw Boom.badRequest(User.CONSTRAINTS.INVALID_CRED.message);
  }

  let deviceId = uuidv4();
  let token = tokenUtils.generateAuthTokens(userJSON, {
    deviceId
  });

  await AuthDevice.create({
    id: deviceId,
    lastUsedAt: new Date(),
    userId: user.id,
    ...deviceParams
  });

  return {
    token,
    user: userJSON
  };
}

export async function refresh(refreshToken) {
  try {
    const { data, id } = tokenUtils.verifyRefreshToken(refreshToken);
    let authDevice = await AuthDevice.findById(data.id);
    let userJSON = data.payload;

    if (!authDevice) {
      throw 'error';
    }

    let token = tokenUtils.generateAuthTokens(userJSON, {
      deviceId: id,
      skipRefresh: true
    });

    return {
      token
    };
  } catch (err) {
    throw Boom.badRequest(MESSAGES.INVALID_TOKEN);
  }
}

export async function logout(deviceId) {
  let authDevice = await AuthDevice.findById(deviceId);

  if (authDevice) {
    await authDevice.destroy();
  }

  return {};
}

import Boom from 'boom';
import * as crypt from '../utils/crypt';

import models from '../models';
const { User } = models;

export async function create(data) {
  try {
    let password = await crypt.encrypt(data.password);
    let user = await User.create({ ...data, password });
    let userJSON = user.toJSON();

    return userJSON;
  } catch (err) {
    if (err.original && err.original.constraint === User.objects.CONSTRAINTS.UNIQUE_EMAIL.key) {
      throw Boom.badRequest(User.objects.CONSTRAINTS.UNIQUE_EMAIL.message);
    }

    throw err;
  }
}

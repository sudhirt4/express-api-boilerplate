import Boom from "boom";

import models from "../../models";
import * as crypt from "../../utils/crypt";

const { User } = models;

export async function create(data) {
  try {
    let password = await crypt.encrypt(data.password);
    let user = await User.create({ ...data, password });
    let userJSON = user.responseJSON();

    return userJSON;
  } catch (err) {
    if (
      err.original &&
      err.original.constraint === User.CONSTRAINTS.UNIQUE_EMAIL.key
    ) {
      throw Boom.badRequest(User.CONSTRAINTS.UNIQUE_EMAIL.message);
    }

    throw err;
  }
}

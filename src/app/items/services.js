import Boom from 'boom';
import uuidv4 from 'uuid/v4';

import models from '../../models';

import MESSAGES from '../../constants/messages';

const { Item } = models;

export async function fetchAll() {
  return await Item.findAll();
}

export async function create(data) {
  let item = await Item.create(data);
  
  return item.responseJSON();
}

import Boom from 'boom';
import uuidv4 from 'uuid/v4';

import models from '../../models';

import MESSAGES from '../../constants/messages';

const { Tag } = models;

export async function fetchAll() {
  return await Tag.findAll();
}

export async function retreive(id) {
  return await Tag.findOne({
    where: { id }
  });
}

export async function create(data) {}

export async function update(id, data) {}

import Boom from 'boom';
import uuidv4 from 'uuid/v4';

import models from '../../models';

import MESSAGES from '../../constants/messages';

const { Item, Tag } = models;

export async function fetchAll() {
  return await Item.findAll({
    include: [
      {
        model: Tag,
        as: 'tags',
        through: { attributes: [] }
      }
    ]
  });
}

export async function retreive(id) {
  return await Item.findOne({
    where: { id },
    include: [
      {
        model: Tag,
        as: 'tags',
        through: { attributes: [] }
      }
    ]
  });
}

export async function create(data) {
  let tags = data.tags;
  delete data.tags;

  let { id } = await models.sequelize.transaction(async transaction => {
    let item = await Item.create(data, { transaction });
    await item.setTags(tags, { transaction });

    return item;
  });

  let item = await retreive(id);

  return item.toJSON();
}

export async function update(id, data) {
  let tags = data.tags;
  delete data.tags;

  await models.sequelize.transaction(async transaction => {
    let item = await Item.findOne({
      where: { id }
    });
    await item.updateAttributes(data, { transaction });
    await item.setTags(tags, { transaction });

    return item;
  });

  let item = await retreive(id);

  return item.toJSON();
}

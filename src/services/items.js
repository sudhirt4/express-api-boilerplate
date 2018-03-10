import models from '../models';
const { Item } = models;

export async function fetchAll() {
  return await Item.objects.findAllWithTags();
}

export async function retreive(id) {
  return await Item.objects.findOneWithTags({
    where: { id }
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
    let item = await Item.findById(id);
    await item.updateAttributes(data, { transaction });
    await item.setTags(tags, { transaction });

    return item;
  });

  let item = await retreive(id);

  return item.toJSON();
}

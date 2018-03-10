import models from '../models';
const { Tag } = models;

export async function fetchAll() {
  return await Tag.findAll();
}

export async function retreive(id) {
  return await Tag.findOne({
    where: { id }
  });
}

import * as ItemServices from '../items';

import Model from '../../models';

const itemsSchema = [
  { name: 'abcd', description: 'asdasd' },
  { name: 'abcd', description: 'asdasd' }
];

function setupItems() {
  return Promise.all([
    Model.Item.destroy({ truncate: true, cascade: true }),
    Model.Tag.destroy({ truncate: true, cascade: true }),
    Model.Item.bulkCreate(itemsSchema)
  ]);
}

describe('fetchAll', () => {
  beforeAll(() => {
    return setupItems();
  });

  it('should return all items', async () => {
    let items = await ItemServices.fetchAll();
    expect(items.length).toEqual(itemsSchema.length);
  });
});

describe('retreive', () => {
  beforeAll(() => {
    return setupItems();
  });

  it('should return item with provided id', async () => {
    let { id } = await Model.Item.findOne();
    let item = await ItemServices.retreive(id);
    expect(item).toBeTruthy();
  });
});

describe('create', () => {
  const itemWithTagsSchema = {
    name: 'xya',
    description: 'asdasd',
    tags: []
  };

  beforeAll(() => {
    return setupItems();
  });

  describe('valid data', () => {
    beforeAll(async () => {
      await ItemServices.create(itemWithTagsSchema);
    });

    it('should add item to the database', async () => {
      let items = await Model.Item.findAll();
      expect(items.length).toEqual(itemsSchema.length + 1);
    });

    it('should add associated tags', async () => {
      let item = Model.findOne({
        order: [['createdAt', 'DESC']]
      });
      expect(item.tags).toEqual(itemsSchema.length + 1);
    });
  });
});

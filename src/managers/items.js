const TagIncludeSchema = {
  association: 'tags'
};

export default class ItemManager {
  constructor(Item) {
    this.Item = Item;
  }

  findOneWithTags(params = {}) {
    return this.Item.findOne({
      include: [TagIncludeSchema],
      ...params
    });
  }

  findAllWithTags(params = {}) {
    return this.Item.findAll({
      include: [TagIncludeSchema],
      ...params
    });
  }
}

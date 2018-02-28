module.exports = (sequelize, DataTypes) => {
  let TagDefinition = sequelize.define(
    'Tag',
    {
      name: {
        type: DataTypes.STRING,
        field: 'name'
      }
    },
    {
      underscored: true,
      tableName: 'tags'
    }
  );

  class Tag extends TagDefinition {
    static associate(models) {
      Tag.belongsToMany(models.Item, {
        through: 'item_tags',
        foreign_key: 'tag_id',
        as: 'items'
      });
    }
  }

  return Tag;
};

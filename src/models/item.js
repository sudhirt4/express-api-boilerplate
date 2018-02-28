module.exports = (sequelize, DataTypes) => {
  let ItemDefinition = sequelize.define(
    'Item',
    {
      name: {
        type: DataTypes.STRING,
        field: 'name'
      },
      description: {
        type: DataTypes.STRING,
        field: 'description'
      }
    },
    {
      underscored: true,
      tableName: 'items'
    }
  );

  class Item extends ItemDefinition {
    static associate(models) {
      Item.belongsToMany(models.Tag, {
        through: 'item_tags',
        foreign_key: 'item_id',
        as: 'tags'
      });
    }
  }

  return Item;
};

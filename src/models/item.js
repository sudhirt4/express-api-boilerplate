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
      },
      createdAt: { type: DataTypes.DATE, field: 'created_at' },
      updatedAt: { type: DataTypes.DATE, field: 'updated_at' }
    },
    {
      underscored: true,
      timestamps: true,
      tableName: 'items'
    }
  );

  class Item extends ItemDefinition {
    static associate(models) {
      Item.belongsToMany(models.Tag, {
        through: 'item_tags',
        foreignKey: 'item_id',
        as: 'tags'
      });
    }
  }

  return Item;
};

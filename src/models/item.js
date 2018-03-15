import ItemManager from '../managers/items';
import { DataTypes } from 'sequelize';

const schema = {
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
};

const options = {
  underscored: true,
  timestamps: true,
  tableName: 'items'
};

const associate = models => {
  models.Item.belongsToMany(models.Tag, {
    through: 'item_tags',
    foreignKey: 'item_id',
    as: 'tags'
  });
};

module.exports = sequelize => {
  const Item = sequelize.define('Item', schema, options);

  Item.associate = associate;
  Item.objects = new ItemManager(Item);

  return Item;
};

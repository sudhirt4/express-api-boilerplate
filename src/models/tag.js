import TagManager from '../managers/tags';
import { DataTypes } from 'sequelize';

const schema = {
  name: {
    type: DataTypes.STRING,
    field: 'name'
  },
  createdAt: { type: DataTypes.DATE, field: 'created_at' },
  updatedAt: { type: DataTypes.DATE, field: 'updated_at' }
};

const options = {
  underscored: true,
  timestamps: true,
  tableName: 'tags'
};

const associate = models => {
  models.Tag.belongsToMany(models.Item, {
    through: 'item_tags',
    foreignKey: 'tag_id',
    as: 'items'
  });
};

module.exports = sequelize => {
  const Tag = sequelize.define('Tag', schema, options);

  Tag.associate = associate;
  Tag.objects = new TagManager(Tag);

  return Tag;
};

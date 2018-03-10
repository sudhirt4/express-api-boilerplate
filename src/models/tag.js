import TagManager from '../managers/tags';

module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define(
    'Tag',
    {
      name: {
        type: DataTypes.STRING,
        field: 'name'
      },
      createdAt: { type: DataTypes.DATE, field: 'created_at' },
      updatedAt: { type: DataTypes.DATE, field: 'updated_at' }
    },
    {
      underscored: true,
      timestamps: true,
      tableName: 'tags'
    }
  );

  Tag.associate = models => {
    Tag.belongsToMany(models.Item, {
      through: 'item_tags',
      foreignKey: 'tag_id',
      as: 'items'
    });
  };

  Tag.objects = new TagManager(Tag);

  return Tag;
};

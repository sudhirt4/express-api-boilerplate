'use strict';
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
    responseJSON() {
      let json = this.toJSON();

      return json;
    }
  }

  return Item;
};

'use strict';
module.exports = (sequelize, DataTypes) => {
  let AuthDeviceDefinition = sequelize.define(
    'AuthDevice',
    {
      userId: { type: DataTypes.STRING, field: 'user_id' },
      lastUsedAt: { type: DataTypes.DATE, field: 'last_used_at' }
    },
    {
      underscored: true,
      tableName: 'auth_devices'
    }
  );

  class AuthDevice extends AuthDeviceDefinition {
    static associate(models) {
      AuthDevice.belongsTo(models.User, {
        foreignKey: 'user_id',
        targetKey: 'id'
      });
    }
  }

  return AuthDevice;
};

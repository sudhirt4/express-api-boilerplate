module.exports = (sequelize, DataTypes) => {
  let AuthDeviceDefinition = sequelize.define(
    'AuthDevice',
    {
      id: {
        type: DataTypes.STRING,
        field: 'id',
        primaryKey: true,
        autoIncrement: false
      },
      userId: { type: DataTypes.INTEGER, field: 'user_id' },
      lastUsedAt: { type: DataTypes.DATE, field: 'last_used_at' },
      createdAt: { type: DataTypes.DATE, field: 'created_at' },
      updatedAt: { type: DataTypes.DATE, field: 'updated_at' }
    },
    {
      underscored: true,
      timestamps: true,
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

import AuthDeviceManager from '../managers/authDevices';

module.exports = (sequelize, DataTypes) => {
  const AuthDevice = sequelize.define(
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

  AuthDevice.associate = models => {
    AuthDevice.belongsTo(models.User, {
      foreignKey: 'user_id',
      targetKey: 'id',
      as: 'users'
    });
  };

  AuthDevice.objects = new AuthDeviceManager(AuthDevice);

  return AuthDevice;
};

import AuthDeviceManager from '../managers/authDevices';
import { DataTypes } from 'sequelize';

const schema = {
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
};

const options = {
  underscored: true,
  timestamps: true,
  tableName: 'auth_devices'
};

const associate = models => {
  models.AuthDevice.belongsTo(models.User, {
    foreignKey: 'user_id',
    targetKey: 'id',
    as: 'users'
  });
};

module.exports = sequelize => {
  const AuthDevice = sequelize.define('AuthDevice', schema, options);

  AuthDevice.associate = associate;
  AuthDevice.objects = new AuthDeviceManager(AuthDevice);

  return AuthDevice;
};

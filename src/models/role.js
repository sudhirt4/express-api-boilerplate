import RoleManager from '../managers/roles';
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
  tableName: 'roles'
};

const associate = models => {
  models.Role.belongsToMany(models.User, {
    through: 'user_roles',
    foreignKey: 'role_id',
    as: 'users'
  });
};

module.exports = sequelize => {
  const Role = sequelize.define('Role', schema, options);

  Role.associate = associate;
  Role.objects = new RoleManager(Role);

  return Role;
};

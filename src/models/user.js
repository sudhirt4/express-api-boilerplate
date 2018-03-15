import UserManager from '../managers/users';
import { DataTypes } from 'sequelize';

const schema = {
  firstName: {
    type: DataTypes.STRING,
    field: 'first_name'
  },
  lastName: {
    type: DataTypes.STRING,
    field: 'last_name'
  },
  email: {
    type: DataTypes.STRING,
    field: 'email'
  },
  password: {
    type: DataTypes.STRING,
    field: 'password'
  },
  createdAt: {
    type: DataTypes.DATE,
    field: 'created_at'
  },
  updatedAt: {
    type: DataTypes.DATE,
    field: 'updated_at'
  }
};

const options = {
  underscored: true,
  tableName: 'users'
};

const associate = models => {
  models.User.belongsToMany(models.Role, {
    through: 'user_roles',
    foreignKey: 'user_id',
    as: 'roles'
  });
};

module.exports = sequelize => {
  const User = sequelize.define('User', schema, options);

  User.associate = associate;
  User.objects = new UserManager(User);

  return User;
};

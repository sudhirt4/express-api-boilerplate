import UserManager from '../managers/users';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
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
    },
    {
      underscored: true,
      tableName: 'users'
    }
  );

  User.associate = models => {
    User.belongsToMany(models.Role, {
      through: 'user_roles',
      foreignKey: 'user_id',
      as: 'roles'
    });
  };

  User.objects = new UserManager(User);

  return User;
};

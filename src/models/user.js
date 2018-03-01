const USER_CONSTRAINTS = {
  UNIQUE_EMAIL: {
    key: 'users_email_key',
    message: 'Email has already been taken.'
  },
  INVALID_CRED: {
    key: 'not_found',
    message: 'Invalid email or password'
  }
};

module.exports = (sequelize, DataTypes) => {
  let UserDefinition = sequelize.define(
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

  class User extends UserDefinition {
    static fetchByEmail(email, options) {
      return User.find({
        where: { email },
        ...options,
        plain: true
      });
    }

    static associate(models) {
      User.belongsToMany(models.Role, {
        through: 'user_roles',
        foreignKey: 'user_id',
        as: 'roles'
      });
    }
  }

  User.CONSTRAINTS = USER_CONSTRAINTS;

  return User;
};

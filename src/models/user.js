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
      }
    },
    {
      underscored: true,
      tableName: 'users'
    }
  );

  class User extends UserDefinition {
    responseJSON() {
      let json = this.toJSON();
      delete json['password'];

      return json;
    }

    static fetchByEmail(email) {
      return User.find({ where: { email } });
    }
  }

  User.CONSTRAINTS = USER_CONSTRAINTS;

  return User;
};

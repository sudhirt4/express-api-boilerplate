module.exports = (sequelize, DataTypes) => {
  let RoleDefinition = sequelize.define(
    'Role',
    {
      name: {
        type: DataTypes.STRING,
        field: 'name'
      },
      createdAt: { type: DataTypes.DATE, field: 'created_at' },
      updatedAt: { type: DataTypes.DATE, field: 'updated_at' }
    },
    {
      underscored: true,
      timestamps: true,
      tableName: 'roles'
    }
  );

  class Role extends RoleDefinition {
    static associate(models) {
      Role.belongsToMany(models.User, {
        through: 'user_roles',
        foreignKey: 'role_id',
        as: 'users'
      });
    }
  }

  return Role;
};

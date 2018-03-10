import RoleManager from '../managers/roles';

module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define(
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

  Role.associate = models => {
    Role.belongsToMany(models.User, {
      through: 'user_roles',
      foreignKey: 'role_id',
      as: 'users'
    });
  };

  Role.objects = new RoleManager(Role);

  return Role;
};

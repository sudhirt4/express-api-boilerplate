/**
 * @param  {object} knex
 * @return {Promise}
 */
export function up(knex) {
  return knex.schema.createTable('user_devices', table => {
    table.increments();
    table.integer('user_id').references('users.id');
    table
      .integer('device_type')
      .notNull()
      .defaultTo(0);
    table.string('refresh_token').notNull();
    table.string('device_id');
    table.string('device_name');

    table
      .timestamp('created_at')
      .notNull()
      .defaultTo(knex.raw('now()'));
    table.timestamp('updated_at').notNull();
  });
}

/**
 * @param  {object} knex
 * @return {Promise}
 */
export function down(knex) {
  return knex.schema.dropTable('user_devices');
}

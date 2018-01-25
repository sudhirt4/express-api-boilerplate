/**
 * @param  {object} knex
 * @return {Promise}
 */
export function up(knex) {
  return knex.schema.createTable('users', table => {
    table.increments();
    table.string('first_name').notNull();
    table.string('last_name').notNull();
    table
      .string('email')
      .notNull()
      .unique();
    table.string('password').notNull();

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
  return knex.schema.dropTable('users');
}

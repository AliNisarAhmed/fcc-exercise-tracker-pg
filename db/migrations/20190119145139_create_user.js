exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table) {
    table.increments();
    table.string('username').unique();
  })
};

exports.down = function(knex, Promise) {
  return knex.dropTable('users');
};

// Users
// id - user id, which will be used to identify the users as well as fetch their exercises
// username - should be unique
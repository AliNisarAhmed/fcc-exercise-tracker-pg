exports.up = function(knex, Promise) {
  return knex.schema.createTable('exercises', function (table) {
    table.increments('id').primary();
    table.integer('user_id').notNullable();
    table.string('description').notNullable();
    table.float('duration').notNullable();
    table.date('date').nullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('exercises');
};

// exercises Table
// id
// user id - to which this exercise belongs
// description - string
// duration - Number (int)
// date 
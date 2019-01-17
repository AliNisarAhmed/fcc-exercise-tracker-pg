const knex = require('./knex');

module.exports = {
  getAllExercises() {
    return knex('exercises');
  },
  createUser(username) {
    return knex('users').insert(username, "*");
  },
  addExercise(exercise) {
    return knex('exercises').insert(exercise, "*");
  }
}
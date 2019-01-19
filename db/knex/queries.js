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
  },
  getExerciseLog(userId) {
    return knex('users').select('exercises.id', 'exercises.description', "exercises.duration", "exercises.date").where('users.id', '=', userId).join('exercises', 'users.id' , '=', 'exercises.user_id');
  },
  getUsername(userId) {
    return knex('users').select('username').where('id', "=", userId);
  }
}
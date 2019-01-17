
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('exercises').del()
    .then(function () {
      // Inserts seed entries
      return knex('exercises').insert([
        {
          user_id: 1,
          description: 'first exercise',
          duration: 20,
          date: '2019-02-01'
        },
        {
          user_id: 1,
          description: 'second exercise',
          duration: 40,
          date: '2019-02-02'
        },
        {
          user_id: 1,
          description: 'third exercise',
          duration: 60,
          date: '2019-02-11'
        },
      ]);
    });
};

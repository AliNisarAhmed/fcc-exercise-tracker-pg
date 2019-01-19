const server = require('../server');

const knex = require('../db/knex/knex');

const request = require('supertest');

afterEach(() => {
  server.close();
});

describe('GET - All exercises ', () => {
  test('should get all exercises as an array', async (done) => {
    const response = await request(server).get('/api/exercise/all');
    expect(response.status).toBe(200);
    expect(response.type).toEqual('application/json');
    expect(response.body).toBeInstanceOf(Array);
    if (response.body.length > 1) {
      expect(response.body[0]).toHaveProperty('id');
      expect(response.body[0]).toHaveProperty('user_id');
      expect(response.body[0]).toHaveProperty('description');
      expect(response.body[0]).toHaveProperty('duration');
      expect(response.body[0]).toHaveProperty('date');
    }
    done();
  });
});

describe('POST - /api/exercise/new-user', () => {
  test('should create a new user object with the given username and unique id', async (done) => {
    const username = "test";
    await knex('users').where('username', username).del();
    const response = await request(server).post('/api/exercise/new-user').send({username});
    expect(response.status).toBe(200);
    expect(response.type).toEqual('application/json');
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty('username');
    expect(response.body.username).toEqual(username);
    expect(response.body).toHaveProperty('id');
    await knex('users').where('username', username).del();
    done();
  });

  test('should not create a user if already exists', async (done) => {
    const username = 'test';
    await knex('users').where('username', username).del();  // deleting the username first to make sure it does not exits
    await knex('users').insert({username});
    const response = await request(server).post('/api/exercise/new-user').send({username});
    expect(response.status).toBe(500);
    await knex('users').where('username', username).del();
    done();
  });
})

describe('POST - /api/exercise/add', () => {
  test('create a new exercise for a user given the user id', async (done) => {
    const exercise = {
      description: 'test',
      duration: 20,
      date: '2019-10-10'
    };
    let username = 'testUser';
    await knex('users').where('username', username).del();
    const {body: user} = await request(server).post('/api/exercise/new-user').send({username});
    console.log('user: ', user);
    const data = {user_id: user.id, ...exercise};
    console.log(data);
    const response = await request(server).post('/api/exercise/add').send(data);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
    "date": "2019-10-09T19:00:00.000Z",
    "description": "test",
    "duration": 20,
    id: response.body.id,
    "user_id": user.id,
    });
    done();
  });
})
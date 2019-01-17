const knex = require('knex');

const environment = process.env.ENVIRONMENT || 'development';
const config = require('../../knexfile');

const connection = knex(config[environment]);

module.exports = connection;

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const queries = require('./db/knex/queries');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.get('/', function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api/exercise/all', async (req, res) => {
  const exercises = await queries.getAllExercises()
  res.json(exercises[0]);
})

app.post('/api/exercise/new-user', async (req, res, next) => {
  try {
    console.log(req.body);
    const user = await queries.createUser(req.body);
    res.json(user[0]);
  } catch (error) {
    next(error);
  }
});

app.post('/api/exercise/add', async (req, res, next) => {
  try {
    const exercise = await queries.addExercise(req.body);
    res.json(exercise[0]);
  } catch (error) {
    next(error);
  }
});

app.get('/api/exercise/log', async (req, res) => {   
});

app.use((req, res, next) => {
  const err = new Error('Error');
  err.status = 400;
  next(err);
})

const PORT = process.env.port || 3000;

app.listen(PORT, () => {
  console.log('server start on ' + PORT);
})

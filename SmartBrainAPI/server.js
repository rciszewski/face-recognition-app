const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    port : 5432,
    user : '',
    password : '',
    database : 'smart-brain'
  }
});

const app = express();
app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {
  res.send('success');
})

app.post('/signin', (req, res) => {signin.handleSignIn(req, res, bcrypt, db)})

app.post('/register', (req, res) => {register.handleRegister(req, res, bcrypt, db)})
  

app.get('/profile/:id', (req, res) => {
  const {id} = req.params; 
  db.select('*').from('users').where({id})
    .then(user => {
      if(user.length){
        res.json(user[0])
      } else {
        res.status(400).json('Not found')
      }
    })
    .catch(err => res.status(400).json('error getting user'))
})

app.put('/image', (req, res) => {
  const { id } = req.body;
  db('users').where('id', '=', id)
  .increment('entries', 1)
  .returning('entries')
  .then(entries => {
    console.log(entries[0].entries)
    res.json(entries[0].entries)
  })
  .catch(err => res.status(400).json('error updating entries'))
})

app.listen(3000, () => {
  console.log('app is running on port 3000');
});

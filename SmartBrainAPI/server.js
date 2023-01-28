const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

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

db.select('*').from('users').then(data => {
  console.log(data);
});

const app = express();
app.use(express.json());
app.use(cors());



const database = {
  users: [
    {
      id: '123',
      name: 'John',
      email: 'John@gmail.com',
      password: 'cookies',
      entries: 0,
      joined: new Date()
    },
    {
      id: '124',
      name: 'Sally',
      email: 'Sally@gmail.com',
      password: 'bananas',
      entries: 0,
      joined: new Date()
    }
  ],
  login: [
    {
      id: '987',
      hash: '',
      email: 'john@gmail.com'
    }
  ]
}

app.get('/', (req, res) => {
  res.send(database.users);
})

app.post('/signin', (req, res) => {
  if(req.body.email === database.users[0].email &&
     req.body.password === database.users[0].password){
    res.json(database.users[0]);
     } else {
      res.status(400).json('error logging in');
     }
})

app.post('/register', (req, res) => {
  const {name, email, password} = req.body;
  bcrypt.hash(password, null, null, function(err, hash) {
    console.log(hash)
  });
  db('users').insert({
    email: email,
    name: name,
    joined: new Date()
  }).then(console.log);
  res.json(database.users[database.users.length-1]);
})

app.get('/profile/:id', (req, res) => {
  const {id} = req.params;
  let found = false;
  database.users.forEach(user => {
    if(user.id === id){
      found = true;
      return res.json(user);
    }
  })
    if(!found) {
      return res.status(400).json('error logging in');
     }
})

app.put('/image', (req, res) => {
  const { id } = req.body;
  let found = false;
  database.users.forEach(user => {
    if(user.id === id){
      found = true;
      user.entries++
      return res.json(user.entries)
    }
  })
  if(!found) return res.send(400).json('error updating entries')
})

// bcrypt.hash("bacon", null, null, function(err, hash) {
//   // Store hash in your password DB.
// });

// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//   // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//   // res = false
// });

app.listen(3000, () => {
  console.log('app is running on port 3000');
});

/*
/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = new user
/profile/:userId --> GET = user
/image --> PUT = user count



*/
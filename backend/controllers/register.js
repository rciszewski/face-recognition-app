
const handleRegister = (req, res, bcrypt, db) => {
  const {name, email, password} = req.body;
  if(!name || !email || !password) {
    return res.status(400).json('Incorrect form submission');
  }
  const hash = bcrypt.hashSync(password);
    db.transaction(trx => {
      return trx
      .insert({email: email, hash: hash})
      .into('login')
      .returning('email')
      .then(loginEmail => {
        return trx
          .insert({
            email: loginEmail[0].email,
            name: name,
            joined: new Date()
          })
          .into('users')
          .returning('*')
          .then(user => {
            res.json(user[0])
          })
      })
  })
  .catch(err => res.status(400).json('unable to register'))
}

module.exports = {
  handleRegister
}


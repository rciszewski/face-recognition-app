const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: '5f7089c95a9a46e2a37c402e60dd41fd'
});

const handleApiCall = (req, res) => {
  app.models
    .predict({id: "a403429f2ddf4b49b307e318f00e528b", version: "34ce21a40cc24b6b96ffee54aabff139"}, req.body.input)
    .then(data => {
      res.json(data);
    })
    .catch(err => res.status(400).json('unable to work with API'));
}


const handleImageSubmit = (req, res, db) => {
  const { id } = req.body;
  db('users').where('id', '=', id)
  .increment('entries', 1)
  .returning('entries')
  .then(entries => {
    console.log(entries[0].entries)
    res.json(entries[0].entries)
  })
  .catch(err => res.status(400).json('error updating entries'))
}

module.exports = {
  handleImageSubmit,
  handleApiCall
}
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
  handleImageSubmit
}
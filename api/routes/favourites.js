const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('get favourites');
});

router.post('/', (req, res) => {
  res.send('post favourites');
});

router.delete('/', (req, res) => {
  res.send('delete favourites');
});

module.exports = router;
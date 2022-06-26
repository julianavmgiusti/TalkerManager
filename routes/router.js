const express = require('express');

const router = express.Router();
const { readFile } = require('../helpers/readWrite');

router.get('/', async (_req, res) => {
  const talker = await readFile('./talker.json');
  if (!talker || talker === undefined) res.status(200).json(JSON.parse([]));
  res.status(200).json(JSON.parse(talker));
});

module.exports = {
  router,
}; 
const express = require('express');

const router = express.Router();
const { readFile } = require('../helpers/readWrite');

const PATH_TALKERSFILE = './talker.json';

router.get('/', async (_req, res) => {
  const talkers = await readFile(PATH_TALKERSFILE);
  if (!talkers || talkers === undefined) res.status(200).json(JSON.parse([]));
  res.status(200).json(JSON.parse(talkers));
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const talkers = await readFile(PATH_TALKERSFILE);
    const talker = JSON.parse(talkers).find((e) => e.id === Number(id));
    if (!talker || talker === undefined) {
      res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }
    res.status(200).json(talker);
  });
module.exports = {
  router,
}; 
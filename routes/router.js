const express = require('express');
// ref: https://www.npmjs.com/package/generate-password
const generator = require('generate-password');
const fs = require('fs');
const {
  emailRequired,
  isEmailValid,
  isPasswordValid,
} = require('../middlewares/loginAuthentication');

const {
  tokenIsRequired,
  isTokenCorrect,
  nameIsRequired,
  isNameHasMinLength,
  ageIsRequired,
  isALegalAge,
  talkerIsRequired,
  watchedIsRequired,
  isWatchedFormatCorrect,
  rateRequired,
  isRateFormatCorrect,
} = require('../middlewares/talkersValidation');

const router = express.Router();
const { readFile } = require('../helpers/readWrite');
const { addTalker } = require('../services/addTalker');

const PATH_TALKERSFILE = './talker.json';

router.get('/talker', async (_req, res) => {
  const talkers = await readFile(PATH_TALKERSFILE);
  if (!talkers || talkers === undefined) return res.status(200).json([]);
  return res.status(200).json(JSON.parse(talkers));
});

router.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talkers = await readFile(PATH_TALKERSFILE);
  const talker = JSON.parse(talkers).find((e) => e.id === Number(id));
  if (!talker || talker === undefined) {
    return res
      .status(404)
      .json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(200).json(talker);
});
router.get('/talker', addTalker);

router.post(
  '/talker',
  tokenIsRequired,
  isTokenCorrect,
  nameIsRequired,
  isNameHasMinLength,
  ageIsRequired,
  isALegalAge,
  talkerIsRequired,
  watchedIsRequired,
  isWatchedFormatCorrect,
  rateRequired,
  isRateFormatCorrect,
  async (req, res) => {
    const talkersFile = await readFile(PATH_TALKERSFILE);
    const talkersList = JSON.parse(talkersFile);
    const { name, age, talk } = req.body;
    const { watchedAt, rate } = talk;
    const newTalker = {
      id: talkersList.length + 1,
      name,
      age,
      talk: { watchedAt, rate },
    };
    talkersList.push(newTalker);
    fs.writeFileSync(PATH_TALKERSFILE, JSON.stringify(talkersList));
    return res.status(201).json(newTalker);
  },
);

// ref: https://www.npmjs.com/package/generate-password
router.post(
  '/login',
  emailRequired,
  isEmailValid,
  isPasswordValid,
  async (req, res) => {
    const token = generator.generate({
      length: 16,
      numbers: true,
    });
    return res.status(200).send({ token });
  },
);

router.put(
  '/talker/:id',
  tokenIsRequired,
  isTokenCorrect,
  nameIsRequired,
  isNameHasMinLength,
  ageIsRequired,
  isALegalAge,
  talkerIsRequired,
  watchedIsRequired,
  isWatchedFormatCorrect,
  rateRequired,
  isRateFormatCorrect,
  
  async (req, res) => {
    const { name, age, talk } = req.body;
    const { id } = req.params;

    const talkersFile = await readFile(PATH_TALKERSFILE);

    const talkerList = JSON.parse(talkersFile).filter(
      (talker) => talker.id !== Number(id),
    );
    const editedTalker = { id: talkerList.length + 1, name, age, talk };

    talkerList.push(editedTalker);
    fs.writeFile(PATH_TALKERSFILE, JSON.stringify(talkerList), (err) => {
      if (err) {
        return res.status(500).json(err);
      }
    });
    return res.status(200).json(editedTalker);
  },
);
module.exports = {
  router,
};

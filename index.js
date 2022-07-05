const express = require('express');
const bodyParser = require('body-parser');
const { router } = require('./routes/router');
// const {
//   emailRequired,
//   isEmailValid,
//   isPasswordValid, 
//   } = require('./middlewares/loginAuthentication');

  // const {
  //   tokenIsRequired,
  //   isTokenCorrect,
  //   nameIsRequired,
  //   isNameHasMinLength,
  //   ageIsRequired,
  //   isALegalAge,
  //   talkerIsRequired,
  //   watchedIsRequired,
  //   isWatchedFormatCorrect,
  //   rateRequired,
  //   isRateFormatCorrect,
  // } = require('./middlewares/talkersValidation');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.use('/', router);

// app.use('/login', emailRequired, isEmailValid, isPasswordValid, router);
app.listen(PORT, () => {
  console.log('Online');
});

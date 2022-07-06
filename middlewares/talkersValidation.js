const tokenIsRequired = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization || authorization === '') {
      return res.status(401).json({ message: 'Token não encontrado' });
    }
    next();
  };
  
  const isTokenCorrect = (req, res, next) => {
    const { authorization } = req.headers;
    if (authorization.length !== 16) {
      return res.status(401).json({ message: 'Token inválido' });
    }
    next();
  };

const nameIsRequired = (req, res, next) => {
    const { name } = req.body;
    if (!name || name === '') {
      return res.status(400).json({ message: 'O campo "name" é obrigatório' });
    }
    next();
  };
  
  const isNameHasMinLength = (req, res, next) => {
    const { name } = req.body;
    if (name.length < 3) {
      return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
    }
    next();
  };
  
  const ageIsRequired = (req, res, next) => {
    const { age } = req.body;
    if (!age || age === '' || !Number.isInteger(age)) {
      return res.status(400).json({ message: 'O campo "age" é obrigatório' });
    }
    next();
  };
  
  const isALegalAge = (req, res, next) => {
    const { age } = req.body;
    if (Number(age) < 18) {
      return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
    }
    next();
  };
  
  const talkerIsRequired = (req, res, next) => {
    const talker = req.body.talk;
    console.log(talker);
    if (!talker || talker === '' || typeof talker !== 'object') {
      return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
    }
    next();
  };
  
  const watchedIsRequired = (req, res, next) => {
    const data = req.body.talk.watchedAt;
    if (!data || data === '') {
      return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
    }
    next();
  };
  
  const isWatchedFormatCorrect = (req, res, next) => {
    const data = req.body.talk.watchedAt;
    // from https://stackoverflow.com/questions/15491894/regex-to-validate-date-formats-dd-mm-yyyy-dd-mm-yyyy-dd-mm-yyyy-dd-mmm-yyyy
    const dateRegex = new RegExp(/^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/);
    console.log(data);
    if (!dateRegex.test(data)) {
      return res.status(400).json({
          message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
    }
    next();
  };
  
  const rateRequired = (req, res, next) => {
    const rating = req.body.talk.rate;
    if ((!rating || rating === '') && Number(rating) !== 0) {
      return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
    }
    next();
  };
  
  const isRateFormatCorrect = (req, res, next) => {
    const rating = req.body.talk.rate;
    if (!Number.isInteger(rating) || Number(rating) < 1 || Number(rating) > 5) {
      return res.status(400).json({
          message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
    }
    next();
  };

  module.exports = {
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
  };
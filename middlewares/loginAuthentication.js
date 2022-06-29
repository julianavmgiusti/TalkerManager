const emailRequired = (req, res, next) => {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: 'O campo "email" é obrigatório' });
    }
    next();
  };

const isEmailValid = (req, res, next) => {
    const { email } = req.body;
    const regexEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!email || !email.match(regexEmail)) {
      return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
    }
  
    next();
  };

  const isPasswordValid = (req, res, next) => {
    const { password } = req.body;
    if (!password || password === undefined) {
       return res.status(400).json({
        message: 'O campo "password" é obrigatório',
      });
    }
  
    if (password.length < 6) {
       return res.status(400).json({
        message: 'O "password" deve ter pelo menos 6 caracteres',
      });
    }
    next();
  };

  module.exports = {
    emailRequired,
    isEmailValid,
    isPasswordValid,
  }; 
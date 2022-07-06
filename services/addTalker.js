const { readFile, writeContentFile } = require('../helpers/readWrite');
    
const addTalker = async (req, res) => {
    const newTalker = req.body;
    const file = await readFile('./talker.json');
    newTalker.id = JSON.parse(file).length + 1;
    await writeContentFile('./talker.json', newTalker);
    return res.status(201).json(newTalker);
  };

  module.exports = {
      addTalker };

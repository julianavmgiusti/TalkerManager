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
// const addTalker = async (path, content) => {
//         const arrContent = await readFile(path);
//         console.log(arrContent);
//         const newTalker = {
//             name: content.name,
//             age: content.age,
//             id: arrContent.length + 1,
//             talk: content.talk,
//         };
//         // console.log(newTalker);
//         // newTalker.id = arrContent.length + 1;
//         arrContent.push(newTalker);
//         await fs.writeFile(path, JSON.stringify(arrContent));
//         return newTalker;
//     };
const fs = require('fs').promises;

const readFile = async (path) => {
    try {
        const jsonContent = await fs.readFile(path, 'utf8');
        return jsonContent;
    } catch (error) {
        console.log(`erro: ${error.message}`);
    }
};

const writeContentFile = async (path, content) => {
    try {
        const arrContent = await readFile(path) || [];
        arrContent.push(content);
        await fs.writeFile(path, JSON.stringify(arrContent));
        return content;
    } catch (error) {
        console.log(error.message);
        return null;
    }
};

module.exports = {
   readFile,
   writeContentFile,
};
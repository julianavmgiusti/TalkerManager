const fs = require('fs').promises;

const readFile = async (path) => {
    try {
        const jsonContent = await fs.readFile(path, 'utf8');
        return jsonContent;
    } catch (error) {
        console.log(`erro: ${error.message}`);
    }
};
module.exports = {
   readFile,
};
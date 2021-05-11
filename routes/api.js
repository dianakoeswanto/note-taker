const path = require('path');
const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);

// ROUTING
module.exports = (app) => {
    app.get('/api/notes', async (req, res) => {
        try {
            const notes = await readFile(path.join(__dirname, '../db/db.json'), 'utf8');

            console.log(notes);
          } catch (e) {
            console.error(e);
          }
    });
};

const path = require('path');
const fs = require('fs');
const util = require('util');
const { uuid } = require('uuidv4');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const dbPath = path.join(__dirname, '../db/db.json');

// ROUTING
module.exports = (app) => {

    //To get saved notes
    app.get('/api/notes', async (req, res) => {
        try {
            const notes = await readFile(dbPath, 'utf8');
            res.json(JSON.parse(notes));
          } catch (e) {
            console.error(e);
            res.json(e);
          }
    });

    //To create new note
    app.post('/api/notes', async (req, res) => {
        try {
            // const note = JSON.parse(req.body);
            const note = req.body;
            note.id = uuid();
            console.log(note);

            const notes = JSON.parse(await readFile(dbPath, 'utf8'));
            notes.push(note);

            await writeFile(dbPath, JSON.stringify(notes));
            res.json(true);
        } catch (e) {
            console.error(e);
            res.json(false);
        }
    })

    //To delete a note based on id
    app.delete('/api/notes/:id', async (req, res) => {
        try {
            const id = req.params.id;

            const notes = JSON.parse(await readFile(dbPath, 'utf8'));
            const updatedNotes = notes.filter((note) => {
                return note.id !== id;
            })

            await writeFile(dbPath, JSON.stringify(updatedNotes));
            res.json(true);
        } catch (e) {
            console.error(e);
            res.json(false);
        }
    })
};

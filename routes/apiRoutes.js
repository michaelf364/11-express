// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================
  
const path = require("path");
const db = require("../db/db.json");
const fs = require("fs");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {
    // API GET Requests
    // Below code handles when users "visit" a page.
    // In each of the below cases when a user visits a link
    // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
    // ---------------------------------------------------------------------------

    // Should read the `db.json` file and return all saved notes as JSON.
    app.get("/api/notes", function (req, res) {
        fs.readFile(path.join(__dirname, "../db/db.json"), 'utf8', (err, jsonString) => {
            if (err) {
                return console.log(err)
            }
            res.json(JSON.parse(jsonString));
        })
    });

    // Should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.
    app.post("/api/notes", function (req, res) {
        let note = req.body;
        note.id = Math.random().toString(16).slice(2);
        db.push(note);
        let json = JSON.stringify(db);

        fs.writeFile(path.join(__dirname, "../db/db.json"), json, "utf8", (err) => {
            if (err) {
                throw err;
            }
        });
        res.json(req.body);
    });

    //delete selected note
    app.delete("/api/notes/:id", function (req, res) {
        const id = req.params.id;
        for (let index = 0; index < db.length; index++) {
            const element = db[index];
            if (element.id === id) {
                db.splice(index, 1);
                break;
            };
        }
        let json = JSON.stringify(db);


        fs.writeFile(path.join(__dirname, "../db/db.json"), json, "utf8", (err) => {
            if (err) {
                throw err;
            }
        });
        res.json(db);
    });
};

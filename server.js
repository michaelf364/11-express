// Dependencies
// =============================================================
const express = require("express");
const path = require("path");

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'))


// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, 'public', "index.html"));
});

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, 'public', "notes.html"));
});

// Should read the `db.json` file and return all saved notes as JSON.
app.get("/api/notes", function (req, res) {
    fs.readFile(path.join(__dirname, "db", "db.json"), 'utf8', (err, jsonString) => {
        if (err) {
            return console.log(err)
        }
        res.json(JSON.parse(jsonString));
    })
});

// Should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.
app.post("/api/notes", function (req, res) {
    fs.readFile(path.join(__dirname, "db", "db.json"), 'utf8', (err, jsonString) => {
        if (err) {
            return console.log(err)
        }

        fs.writeFile(path.join(__dirname, "db", "db.json"), _________, (err) => {
            if (err) {
                return console.log(err);
            }
        });
    })
});

app.delete("/api/notes/:id", function (req, res) {
    fs.readFile(path.join(__dirname, "db", "db.json"), 'utf8', (err, jsonString) => {
        if (err) {
            return console.log(err)
        }
        res.json(JSON.parse(jsonString));
    })
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});

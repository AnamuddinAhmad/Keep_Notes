const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
const fs = require('fs');
const { log } = require('console');
const { fileLoader } = require('ejs');

app.set('Views engine', 'ejs');
app.use(express.static(path.join(__dirname, 'Public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Creating Routes and its main routs
app.get('/', (req, res) => {
    fs.readdir(`./files`, (err, files) => {
        res.render("Index.ejs", { files: files });
    });
});

//reading files

app.get("/Files/:filename", (req, res) => {
    fs.readFile(`./files/${req.params.filename}`, "utf-8", (err, filedata) => {
        res.render("Show.ejs", { filename: req.params.filename, filedata: filedata });
    });
});

//create a file with the diffent routs.
//and after creating it will redirect to the "/" routs.
app.post('/create', (req, res) => {
    console.log(req.body);
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`, req.body.details, (err) => {
        res.redirect("/");
    });
});



//building server
app.listen(port, () => {
    console.log(`Port Listening on ${port}`);
});

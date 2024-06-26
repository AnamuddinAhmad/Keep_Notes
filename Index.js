const express = require("express");
const app = express();
const path = require("path");
const port = 3000;
const fs = require("fs");
const { log } = require("console");
const { fileLoader } = require("ejs");

app.set("Views engine", "ejs");
app.use(express.static(path.join(__dirname, "Public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//create a file with the diffent routs.
//and after creating it will redirect to the "/" routs.
app.post("/create", (req, res) => {
  fs.writeFile(
    `./files/${req.body.title.split(" ").join("")}.txt`,
    req.body.details,
    (err) => {
      res.redirect("/");
    }
  );
});

//Creating Routes and its main routs
app.get("/", (req, res) => {
  fs.readdir(`./files`, (err, files) => {
    res.render("Index.ejs", { files: files });
  });
});

//reading files

app.get("/Files/:filename", (req, res) => {
  fs.readFile(`./files/${req.params.filename}`, "utf-8", (err, filedata) => {
    res.render("Show.ejs", {
      filename: req.params.filename,
      filedata: filedata,
    });
  });
});

app.get("/Rename/:filename", (req, res) => {
  res.render("Update.ejs", { filename: req.params.filename });
});

//create a file with the diffent routs.
//and after creating it will redirect to the "/" routs.
app.post("/Rename", (req, res) => {
  fs.rename(
    `./Files/${req.body.previousname}`,
    `./Files/${req.body.newname.split(" ").join("")}.txt`,
    () => {
      console.log("File Changed");
      res.redirect("/");
    }
  );
});

//delete the files.

app.get("/Delete/:filename", (req, res) => {
  console.log(req.params.filename);
  fs.rm(req.params.filename, (err) => {
    
    console.log("Deleted");
  });
  res.render("Delete.ejs");
});

app.post("/Delete/:filename", (req, res) => {
  
  res.redirect("/");
});

//building server
app.listen(port, () => {
  console.log(`Port Listening on ${port}`);
});

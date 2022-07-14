const express = require("express");
const open = require("open");
const fs = require("fs");

let data = JSON.parse(
  fs
    .readFileSync(
      "./data/test-results.json"
    )
    .toString()
);

const app = express();

const testResults = (req, res) => {
  const results = data;

  res.render("index", { results });
};

app.set("view engine", "ejs");

app.get("/", testResults);

let server = app.listen(8000, () => {
  console.log("Server is online on port: 8000");
});


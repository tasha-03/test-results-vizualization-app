const express = require("express");
const fs = require("fs");
const Convert = require("ansi-to-html");
const convert = new Convert();
const filename =
  // "C:/Users/tasha/Documents/VS Code/Web/SplunkProxy/SplunkProxy/demo/test-results.json";
  "data/test-results.json";

const app = express();

const testResults = (req, res) => {
  let data = JSON.parse(fs.readFileSync(filename));
  const results = data || {};

  res.render("index", { results });
};

const getSuite = (req, res) => {
  let data = JSON.parse(fs.readFileSync(filename));
  const results = data.testResults[req.params.ID] || {};

  results && results.message
    ? (results.message = convert.toHtml(results.message))
    : null;

  res.render("test-suite", { results, id: req.params.ID });
};

const getTest = (req, res) => {
  let data = JSON.parse(fs.readFileSync(filename));
  const test =
    data.testResults[req.params.suiteID].assertionResults[req.params.ID];
  test && test.failureMessages
    ? (test.failureMessages = test.failureMessages.map((m) =>
        convert.toHtml(m)
      ))
    : null;

  res.render("test-results", {
    test,
    suiteId: req.params.suiteID,
    id: req.params.ID,
  });
};

app.set("view engine", "ejs");

app.get("/", testResults);
app.get("/:ID", getSuite);
app.get("/:suiteID/:ID", getTest);

let server = app.listen(8000, () => {
  console.log("Server is online on port:", server.address().port);
});

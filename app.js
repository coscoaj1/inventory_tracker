const express = require("express");
const app = express();

const morgan = require("morgan");
const cors = require("cors");

app.get("test", (req, res) => {
  res.status(200).send("OK");
});
app.post("/inventory", (req, res) => {
  res.status(200).send("OK");
});

morgan.token("body", (req) => JSON.stringify(req.body));
app.use(morgan(":url :method :response-time ms :body"));

module.exports = app;

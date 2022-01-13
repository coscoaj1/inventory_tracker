const express = require("express");
const app = express();

const morgan = require("morgan");
const cors = require("cors");
app.use(express.json());

app.get("test", (req, res) => {
  res.status(200).send("OK");
});

app.post("/inventory", (req, res) => {
  const { product_name } = req.body;

  if (!product_name) {
    return res.status(401).json({ error: "product name missing or invalid" });
  }
  res.send({ id: 0 });
});

morgan.token("body", (req) => JSON.stringify(req.body));
app.use(morgan(":url :method :response-time ms :body"));

module.exports = app;

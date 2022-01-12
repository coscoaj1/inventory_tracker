const express = require("express");
const app = express();

const morgan = require("morgan");
const cors = require("cors");

app.get("test", (req, res) => {
  res.send("👍");
});

morgan.token("body", (req) => JSON.stringify(req.body));
app.use(morgan(":url :method :response-time ms :body"));

export default app;

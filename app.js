const express = require("express");
const app = express();
const inventoryRouter = require("./controllers/Products");
//const logger = require("./utils/logger");
const cors = require("cors");
const morgan = require("morgan");
const {
  requestLogger,
  unknownEndpoint,
  errorLogger,
  errorResponder,
} = require("./utils/middleware");


app.use(cors());
app.use(express.json());
// app.use(express.static("build"));
app.use(morgan(":url :method :response-time ms :body"));
morgan.token("body", (req) => JSON.stringify(req.body));
app.use("/", inventoryRouter, express.static("uploads"));
app.use("/api/inventory", inventoryRouter);

app.use(requestLogger);
app.use(errorLogger);
app.use(errorResponder);
app.use(unknownEndpoint);

module.exports = app;

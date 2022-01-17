const express = require("express");
const app = express();
const inventoryRouter = require("./controllers/products");
const sequelize = require("./utils/sequelize");
const logger = require("./utils/logger");
const cors = require("cors");
const morgan = require("morgan");
const {
  requestLogger,
  unknownEndpoint,
  errorLogger,
  errorResponder,
} = require("./utils/middleware");

morgan.token("body", (req) => JSON.stringify(req.body));

sequelize
  .sync()
  .then(() => {
    logger.info("connected to Amazon RDS");
  })
  .catch((error) => {
    logger.error("error connecting to Amazon RDS:", error.message);
  });

app.use(cors());
app.use(express.json());
app.use(express.static("build"));
app.use(morgan(":url :method :response-time ms :body"));
app.use("/api/inventory", inventoryRouter);

app.use(requestLogger);
app.use(errorLogger);
app.use(errorResponder);
app.use(unknownEndpoint);

module.exports = app;

const express = require("express");
const app = express();
const inventoryRouter = require("./controllers/products");
const sequelize = require("./utils/database");
const logger = require("./utils/logger");

const morgan = require("morgan");
const cors = require("cors");

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
app.use("/api/inventory", inventoryRouter);

morgan.token("body", (req) => JSON.stringify(req.body));
app.use(morgan(":url :method :response-time ms :body"));

module.exports = app;

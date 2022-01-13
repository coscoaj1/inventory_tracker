const express = require("express");
const app = express();
const inventoryRouter = require("./controllers/Products");

const morgan = require("morgan");
const cors = require("cors");

app.use(express.json());
app.use("/api/inventory", inventoryRouter);

morgan.token("body", (req) => JSON.stringify(req.body));
app.use(morgan(":url :method :response-time ms :body"));

module.exports = app;

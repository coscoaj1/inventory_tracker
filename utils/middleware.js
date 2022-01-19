const logger = require("./logger");

const requestLogger = (req, res, next) => {
  logger.info("Method:", req.method);
  logger.info("Path:  ", req.path);
  logger.info("Body:  ", req.body);
  logger.info("---");
  next();
};

const errorLogger = (err, req, res, next) => {
  logger.error("Something Broke:", err);
  next(err);
};

const errorResponder = (err, req, res, next) => {
  res.header("Content-Type", "application/json");
  res.status(err.statusCode).send(JSON.stringify(err, null, 4));
  next(err);
};

const unknownEndpoint = (req, res) => {
  res.redirect("/api/inventory/error");
};

module.exports = {
  requestLogger,
  errorLogger,
  unknownEndpoint,
  errorResponder,
};

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
  if (
    !req.body.product_name ||
    !req.body.sku ||
    !req.body.location ||
    !req.body.count
  ) {
    return res.status(401).json({ error: "missing or invalid field" });
  } else if (!req.file) {
    return res.status(401).json({ error: "missing thumbnail image" });
  } else if (!returnUpdatedProduct) {
    res.status(400).json("Invalid product id");
  }
  res.header("Content-Type", "application/json");
  res.status(err.statusCode).send(JSON.stringify(err, null, 4));
  next(err);
};

const unknownEndpoint = (req, res, next) => {
  res.redirect("/api/inventory/error");
};

module.exports = {
  requestLogger,
  errorLogger,
  unknownEndpoint,
  errorResponder,
};

const logger = require("./logger");
import { Request, Response, NextFunction } from "express"
import { HttpError } from "http-errors";


const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  logger.info("Method:", req.method);
  logger.info("Path:  ", req.path);
  logger.info("Body:  ", req.body);
  logger.info("---");
  next();
};

const errorLogger = (err: HttpError, req: Request, res: Response, next: NextFunction) => {
  logger.error("Something Broke:", err);
  next(err);
};

const errorResponder = (err: HttpError, req: Request, res: Response, next: NextFunction) => {
  res.header("Content-Type", "application/json");
  res.status(err.statusCode).send(JSON.stringify(err, null, 4));
  next(err);
};

const unknownEndpoint = (req: HttpError, res: Response) => {
  res.redirect("/api/inventory/error");
};

module.exports = {
  requestLogger,
  errorLogger,
  unknownEndpoint,
  errorResponder,
};

import logger from "./logger.js";
import { Request, Response, NextFunction } from "express";
import { HttpError } from "http-errors";


export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  logger.info("Method:", req.method);
  logger.info("Path:  ", req.path);
  logger.info("Body:  ", req.body);
  logger.info("---");
  next();
};

export const errorLogger = (err: HttpError, req: Request, res: Response, next: NextFunction) => {
  logger.error("Something Broke:" + err.message);
  next(err);
};


export const errorResponder = (err: HttpError, req: Request, res: Response, next: NextFunction) => {
  res.header("Content-Type", "application/json");
  res.status(err.statusCode).send(JSON.stringify(err, null, 4));
};


export const unknownEndpoint = (req: Request, res: Response) => {
  logger.error("Unknown Endpoint:" + req.path)
  res.status(404).send({ error: "unknown endpoint" });
  // res.redirect("/api/inventory/error");
};

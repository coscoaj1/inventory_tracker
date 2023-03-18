import logger from "./logger.js";
export const requestLogger = (req, res, next) => {
    logger.info("Method:", req.method);
    logger.info("Path:  ", req.path);
    logger.info("Body:  ", req.body);
    logger.info("---");
    next();
};
export const errorLogger = (err, req, res, next) => {
    logger.error("Something Broke:" + err.message);
    next(err);
};
export const errorResponder = (err, req, res, next) => {
    res.header("Content-Type", "application/json");
    res.status(err.statusCode).send(JSON.stringify(err, null, 4));
};
export const unknownEndpoint = (req, res) => {
    logger.error("Unknown Endpoint:" + req.path);
    res.status(404).send({ error: "unknown endpoint" });
    // res.redirect("/api/inventory/error");
};

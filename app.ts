import express, { Request } from "express"
const app = express();
import { router } from "./controllers/Products";
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
morgan.token("body", (req: Request) => JSON.stringify(req.body));
app.use("/", router, express.static("uploads"));
app.use("/api/inventory", router);

app.use(requestLogger);
app.use(errorLogger);
app.use(errorResponder);
app.use(unknownEndpoint);

export default app;

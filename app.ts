import express, { Request } from "express"
const app = express();
import { router } from "./controllers/Products.js";
import cors from "cors";
import morgan from "morgan";
import {
  requestLogger,
  errorLogger,
  errorResponder,
} from "./utils/middleware.js";

app.use(cors());
app.use(express.json());
app.use(express.static("build"));
app.use(morgan(":url :method :response-time ms :body"));
morgan.token("body", (req: Request) => JSON.stringify(req.body));
// app.use("/", router, express.static("uploads"));
app.use("/api/inventory", router);

app.use(requestLogger);
app.use(errorLogger);
app.use(errorResponder);
// app.use(unknownEndpoint);

export default app ;

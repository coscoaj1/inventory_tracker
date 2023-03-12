require("dotenv").config();
import app from "./app";
import http from "http";
import * as config from "./utils/config"
import * as logger from "./utils/logger";

const server = http.createServer(app);

server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});

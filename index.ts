const app = require("./app");
const http = require("http");
import * as config from "./utils/config"
import * as logger from "./utils/logger";

const server = http.createServer(app);

server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});

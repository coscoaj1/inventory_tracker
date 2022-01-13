const app = require("./app");
const http = require("http");
const config = require("./utils/config");
const sequelize = require("./utils/database");
const logger = require("./utils/logger");

const server = http.createServer(app);

sequelize.sync().then(() => {
  server.listen(PORT, () => {
    logger.info(`Server running on port ${config.PORT}`);
  });
});

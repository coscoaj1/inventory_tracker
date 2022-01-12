const app = require("./app");
const http = require("http");
const sequelize = require("./utils/database");

const server = http.createServer(app);

const PORT = process.env.PORT || 3001;
sequelize.sync().then(() => {
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

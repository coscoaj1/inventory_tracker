const Sequelize = require("sequelize");
const config = require("./config");
console.log("user:", config.USER);

const sequelize = new Sequelize(config.DATABASE, config.USER, config.PASSWORD, {
  dialect: "mysql",
  host: config.MYSQL_URI,
});

module.exports = sequelize;

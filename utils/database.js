require("dotenv").config();
const Sequelize = require("sequelize");
console.log("process env user:", process.env.USER);
const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.USER,
  process.env.PASSWORD,
  {
    dialect: "mysql",
    host: process.env.HOST,
  }
);

module.exports = sequelize;

require("dotenv").config();

const PORT = process.env.PORT;
const MYSQL_URI = process.env.MYSQL_URI;
const USER = process.env.USER;
const PASSWORD = process.env.PASSWORD;
const DATABASE = process.env.DATABASE;

module.exports = {
  MYSQL_URI,
  PORT,
  USER,
  PASSWORD,
  DATABASE,
};

//file to handle all environment variables

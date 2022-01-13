require("dotenv").config();

const PORT = process.env.PORT;
const MYSQL_URI = process.env.MYSQL_URI;

module.exports = {
  MYSQL_URI,
  PORT,
};

//file to handle environment variables

require("dotenv").config();

const PORT = process.env.PORT;
const MYSQL_URI = process.env.MYSQL_URI;
const USER = process.env.USER;
const PASSWORD = process.env.PASSWORD;
const DATABASE = process.env.DATABASE;
const BUCKET_NAME = process.env.BUCKET_NAME;
const REGION = process.env.BUCKET_REGION;
const ACCESS_KEY_ID = process.env.ACCESS_KEY_ID;
const SECRET_ACCESS_KEY = process.env.SECRET_ACCESS_KEY;

module.exports = {
  BUCKET_NAME,
  REGION,
  ACCESS_KEY_ID,
  SECRET_ACCESS_KEY,
  MYSQL_URI,
  PORT,
  USER,
  PASSWORD,
  DATABASE,
};

//file to handle all environment variables

require("dotenv").config();

const PORT = process.env.PORT;
const MYSQL_URI = process.env.MYSQL_URI;
const USER = process.env.USER;
const PASSWORD = process.env.PASSWORD;
const DATABASE = process.env.DATABASE;
const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME;
const REGION = process.env.AWS_BUCKET_REGION;
const AWS_ACCESS_KEY_ID = process.env_AWS_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;

module.exports = {
  AWS_BUCKET_NAME,
  REGION,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  MYSQL_URI,
  PORT,
  USER,
  PASSWORD,
  DATABASE,
};

//file to handle all environment variables

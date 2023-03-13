import * as dotenv from 'dotenv'
dotenv.config();

const PORT = process.env.PORT
const PG_HOST = process.env.PG_HOST;
const PG_PORT = process.env.PG_PORT;
const PG_USER = process.env.PG_USER;
const PG_PASSWORD = process.env.PG_PASSWORD;
const PG_DATABASE = process.env.PG_DATABASE;
const BUCKET_NAME = process.env.BUCKET_NAME;
const REGION = process.env.BUCKET_REGION;
const ACCESS_KEY_ID = process.env.ACCESS_KEY_ID;
const SECRET_ACCESS_KEY = process.env.SECRET_ACCESS_KEY;

export {
  BUCKET_NAME,
  REGION,
  ACCESS_KEY_ID,
  SECRET_ACCESS_KEY,
  PG_HOST,
  PG_PORT,
  PORT,
  PG_USER,
  PG_PASSWORD,
  PG_DATABASE,
};

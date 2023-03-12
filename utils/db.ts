const config = require("./config");
const { Pool } = require("pg");
 
const pool = new Pool({host: config.PG_HOST,
  port: config.PG_PORT,
  user: config.PG_USER,
  password: config.PG_PASSWORD,
  database: config.PG_DATABASE,});
 
module.exports = {
  query: (text: string, params: Array<any>) => pool.query(text, params),
};



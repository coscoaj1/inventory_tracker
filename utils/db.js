const { Client } = require("pg");
const config = require("./config");


module.exports.getClient = async () => {
  const client = new Client({
    host: config.PG_HOST,
    port: config.PG_PORT,
    user: config.PG_USER,
    password: config.PG_PASSWORD,
    database: config.PG_DATABASE,
  });
  // await client.connect();
  return client;
};
const { Pool } = require('pg')
 
const pool = new Pool({host: config.PG_HOST,
  port: config.PG_PORT,
  user: config.PG_USER,
  password: config.PG_PASSWORD,
  database: config.PG_DATABASE,})
 
module.exports = {
  query: (text, params) => pool.query(text, params),
}
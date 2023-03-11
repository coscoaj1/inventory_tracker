// const { Client } = require("pg");


// const client = new Client();

// client
//   .connect()
//   .then(() => console.log("connected"))
//   .catch((err) => console.error("connection error", err.stack));

const { Client } = require("pg");
require("dotenv").config();


module.exports.getClient = async () => {
  const client = new Client({
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
  });
  // await client.connect();
  return client;
};
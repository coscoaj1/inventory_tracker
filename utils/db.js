import config from "./config";
import { Pool } from "pg";
const pool = new Pool({ host: config.PG_HOST,
    port: parseInt(config.PG_PORT || "3001"),
    user: config.PG_USER,
    password: config.PG_PASSWORD,
    database: config.PG_DATABASE, });
export default {
    query: (text, params) => pool.query(text, params),
};

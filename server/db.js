require("dotenv").config({path: "../.env"});

const Pool = require("pg").Pool;

const pool = new Pool({
  user: process.env.LOCAL_DB_USER,
  password: process.env.LOCAL_DB_PASSWORD,
  host: process.env.LOCAL_DB_HOST,
  port: process.env.LOCAL_DB_PORT,
  database: process.env.LOCAL_DB_NAME,
});

module.exports = pool;

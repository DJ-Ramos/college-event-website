const Pool = require("pg").Pool;

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  connectionString: "postgres://u3gfpdvq223n7i:p528f9fc0187cf76e0b8ba02a4364c2c5f4c69c753b68f3a89940d7334f294597@c7gljno857ucsl.cluster-czrs8kj4isg7.us-east-1.rds.amazonaws.com:5432/d748ho327flu5a",
  ssl: {rejectUnauthorized: false},
});

module.exports = pool;

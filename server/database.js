require("dotenv").config();
const Pool = require("pg").Pool;

const pool = new Pool({
   user: process.env.DB_USER,
   password: process.env.DB_PASSWORD,
   database: "pokidex_favorites",
   host: process.env.DB_HOST,
   port: process.env.DB_PORT,
});

module.exports = pool;

require("dotenv").config();
const Pool = require("pg").Pool;

const pool = new Pool({
   user: process.env.USER,
   password: process.env.DB_PASSWORD,
   database: process.env.DB_NAME,
   host: process.env.HOST,
   port: process.env.PORT,
});

module.exports = pool;

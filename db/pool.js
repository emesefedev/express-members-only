require("dotenv").config()
const { Pool } = require("pg")

module.exports = new Pool({
  host: process.env.HOST, 
  user: process.env.ROLE_NAME,
  database: process.env.DATABASE,
  password: process.env.DB_PSW,
  port: 5432 // The default port
})
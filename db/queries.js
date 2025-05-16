const pool = require("./pool")

// membershipStatus = "normal" | "premium" | "admin"
async function insertUser(username, firstName, lastName, password, membersipStatus = "normal") {
  await pool.query(
    "INSERT INTO users (username, first_name, last_name, password, membership_status) VALUES ($1, $2, $3, $4)", 
    [username, firstName, lastName, password, membersipStatus])
}

module.exports = {
  insertUser
}
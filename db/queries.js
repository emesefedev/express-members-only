const pool = require("./pool")

// membershipStatus = "normal" | "premium" | "admin"
async function insertUser(username, firstName, lastName, password, membersipStatus = "normal") {
  await pool.query(
    "INSERT INTO users (username, first_name, last_name, password, membership_status) VALUES ($1, $2, $3, $4, $5)", 
    [username, firstName, lastName, password, membersipStatus])
}

async function getUserFromUsername(username) {
  const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [username])
  return rows[0]
}

async function getUserFromID(id) {
  const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id])
  return rows[0]
}

module.exports = {
  insertUser,
  getUserFromUsername,
  getUserFromID
}
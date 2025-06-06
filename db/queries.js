const pool = require("./pool")

// membershipStatus = "normal" | "premium" | "admin"
async function insertUser(username, firstName, lastName, password, salt, membersipStatus = "normal") {
  await pool.query(
    "INSERT INTO users (username, first_name, last_name, password, salt, membership_status) VALUES ($1, $2, $3, $4, $5, $6)", 
    [username, firstName, lastName, password, salt, membersipStatus])
}

async function getUserFromUsername(username) {
  const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [username])
  return rows[0]
}

async function getUserByID(id) {
  const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id])
  return rows[0]
}

async function getAllUsernames() {
  const { rows } = await pool.query("SELECT username FROM users")
  return rows
}

async function getAllUsersPublicInfo() {
  const { rows } = await pool.query("SELECT id, username, first_name, last_name, membership_status  FROM users")
  return rows
}

async function deleteUserByID(id) {
  const user = getUserByID(id)
  if (!user) {
    throw new Error(`Trying to delete inexistent user with id ${id}`)
  }

  await pool.query("DELETE FROM users WHERE id = $1", [id])
  console.log(`User with id ${id} deleted`)
}

async function updateUserMembershipStatusByID(id, status) {
  const user = getUserByID(id)
  if (!user) {
    throw new Error(`Trying to update inexistent user with id ${id}`)
  }

  await pool.query("UPDATE users SET membership_status = $1 WHERE id = $2", [status, id])
  console.log(`User with id ${id} updated`)
}

module.exports = {
  insertUser,
  getUserFromUsername,
  getUserByID,
  getAllUsernames,
  getAllUsersPublicInfo,
  deleteUserByID,
  updateUserMembershipStatusByID
}
const bcryptjs = require("bcryptjs")

const validatePassword = (password, hash) => {
  return bcryptjs.compareSync(password, hash)
}

const generatePassword = (password) => {
  const salt = bcryptjs.genSaltSync(10)
  const hash = bcryptjs.hashSync(password, salt)

  return { salt, hash }
}

module.exports = {
  validatePassword,
  generatePassword
}
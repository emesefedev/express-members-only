const { isAdminUser } = require("./user")

const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    next()
  } else {
    res.status(401).json({ message: "You are not authenticated "})// TODO: Lanzar error personalizado
  }
}

const isAdmin = (req, res, next) => {
  if (req.isAuthenticated() && isAdminUser(req.user)) {
    next()
  } else {
    res.status(401).json({ message: "You are not authorized because you are not an admin "})// TODO: Lanzar error personalizado
  }
}

module.exports = {
  isAuthenticated,
  isAdmin
}
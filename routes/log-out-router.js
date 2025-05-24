const { Router } = require("express")
const { isAuthenticated } = require("../utilities/authMiddleware")

const logOutRouter = Router()

logOutRouter.get("/", isAuthenticated, (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err)
    }
    res.redirect("/")
  })
})

module.exports = logOutRouter
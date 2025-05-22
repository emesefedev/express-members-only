const { Router } = require("express")
const { isAuthenticated } = require("../utilities/authMiddleware") 

const messagesRouter = Router()

messagesRouter.get("/", isAuthenticated, (req, res, next) => {
  res.render("messages", { title: "Messages", user: req.user, isAuthenticated: req.isAuthenticated() })
})

module.exports = messagesRouter
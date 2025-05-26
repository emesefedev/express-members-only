const { Router } = require("express")
const { isAuthenticated } = require("../utilities/authMiddleware") 
const { capitalize } = require("../utilities/strings")

const messagesRouter = Router()

messagesRouter.get("/", isAuthenticated, (req, res ) => {
  res.render("messages", { title: "Messages", user: req.user, capitalize })
})

module.exports = messagesRouter
const { Router } = require("express")
const { isAuthenticated } = require("../utilities/authMiddleware") 

const messagesRouter = Router()

messagesRouter.get("/", isAuthenticated, (req, res ) => {
  res.render("messages", { title: "Messages", user: req.user })
})

module.exports = messagesRouter
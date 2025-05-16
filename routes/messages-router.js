const { Router } = require("express")

const messagesRouter = Router()

messagesRouter.get("/", (req, res, next) => {
  res.render("messages", { title: "Messages", user: req.user })
})

module.exports = messagesRouter
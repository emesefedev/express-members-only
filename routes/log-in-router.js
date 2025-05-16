const { Router } = require("express")
const passport = require("passport")

const logInRouter = Router()

logInRouter.get("/", async (req, res) => {
  res.render("log-in", { title: "Log In" })
})

logInRouter.post("/", 
  passport.authenticate("local", {
    successRedirect: "/messages",
    failureRedirect: "/"
  })
)

module.exports = logInRouter
const { Router } = require("express")
const passport = require("passport")

const logInRouter = Router()

logInRouter.get("/", async (req, res) => {
  if (!req.isAuthenticated()) {
    res.render("log-in", { title: "Log In" })
  } else {
    res.redirect("/messages")
  }
})

logInRouter.post("/", 
  passport.authenticate("local", {
    successRedirect: "/messages",
    failureRedirect: "/"
  })
)

module.exports = logInRouter
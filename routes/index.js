const signUpRouter = require("./sign-up-router")
const logInRouter = require("./log-in-router")
const logOutRouter = require("./log-out-router")
const messagesRouter = require("./messages-router");
const membersRouter = require("./members-router");

const router = require('express').Router();

router.use("/sign-up", signUpRouter)
router.use("/log-in", logInRouter)
router.use("/log-out", logOutRouter)
router.use("/messages", messagesRouter)
router.use("/members", membersRouter)


router.get("/", (req, res) => {
  if (!req.isAuthenticated()) {
    res.render("index", { title: "Members Only" })
  } else {
    res.redirect("/messages")
  }
    
})

module.exports = router
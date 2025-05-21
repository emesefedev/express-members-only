const signUpRouter = require("./sign-up-router")
const logInRouter = require("./log-in-router")
const logOutRouter = require("./log-out-router")
const messagesRouter = require("./messages-router")

const router = require('express').Router();

router.use("/sign-up", signUpRouter)
router.use("/log-in", logInRouter)
router.use("/log-out", logOutRouter)
router.use("/messages", messagesRouter)


router.get("/", (req, res) => {
    res.render("index", { title: "Home" })
})

module.exports = router
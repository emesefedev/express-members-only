const { Router } = require("express")
const db = require("../db/queries")
const { generatePassword } = require("../utilities/password")
const { validationResult } = require("express-validator")
const { validateUser } = require("../controllers/usersController")

const signUpRouter = Router()

signUpRouter.get("/", async (req, res) => {
  if (!req.isAuthenticated()) {
    res.render("sign-up", { title: "Sign Up" })
  } else {
    res.redirect("/")
  }
})

signUpRouter.post("/", [validateUser, async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).render("sign-up", { title: "Sign Up", errors: errors.array() })
  }

  const { salt, hash } = generatePassword(req.body.password)
  await db.insertUser(req.body.username, req.body.first_name, req.body.last_name, hash, salt)
  res.redirect("/log-in")
}])

module.exports = signUpRouter
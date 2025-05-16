const { Router } = require("express")
const db = require("../db/queries")
const bcryptjs = require("bcryptjs")

const signUpRouter = Router()

signUpRouter.get("/", async (req, res) => {
  
  res.render("sign-up", { title: "Sign Up" })
})

signUpRouter.post("/", async (req, res, next) => {
  try {
    const hashedPassword = await bcryptjs.hash(req.body.password, 10)
    await db.insertUser(req.body.username, req.body.first_name, req.body.last_name, hashedPassword)
    res.redirect("/log-in")
  } catch(err) {
    return next(err) // ¿Se me quedará pillada porque el error se gestiona en app.js?
  }
})

module.exports = signUpRouter
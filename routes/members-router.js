const { Router } = require("express")
const { isAdmin } = require("../utilities/authMiddleware") 
const db = require("../db/queries")

const membersRouter = Router()

membersRouter.get("/", isAdmin, async (req, res ) => {
  const members = await db.getAllUsernamesAndMembershipStatus()
  res.render("members", { title: "Members", members })
})

module.exports = membersRouter
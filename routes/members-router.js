const { Router } = require("express")
const { isAdmin } = require("../utilities/authMiddleware") 
const db = require("../db/queries")

const membersRouter = Router()

membersRouter.get("/", isAdmin, async (req, res ) => {
  const members = await db.getAllUsersPublicInfo()
  res.render("members", { title: "Members", members })
})

membersRouter.delete("/delete/:id", async (req, res) => {
  const { id } = req.params
  console.log(id)
  try {
    await db.deleteUserByID(id)

    res.status(200).json({ success: true })
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false }) // TODO: Mostrar el error
  }
})

module.exports = membersRouter
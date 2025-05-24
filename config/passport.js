const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const { validatePassword } = require("../utilities/password")
const db = require("../db/queries")


const verifyCallback = async (username, password, done) => {
  try {
    const user = await db.getUserFromUsername(username)

    if (!user) {
      return done(null, false, { message: "Incorrect username" })
    }

    const isValid = await validatePassword (password, user.password)
    if (!isValid) {
      return done(null, false, { message: "Incorrect password" })
    }

    return done(null, user)

  } catch(error) {
    return done(error)
  }
}

const strategy = new LocalStrategy(verifyCallback)

passport.use(strategy)

passport.serializeUser((user, done) => {
  done(null, user.id)
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.getUserByID(id)
    done(null, user)
  } catch(err) {
    done(err)
  }
})
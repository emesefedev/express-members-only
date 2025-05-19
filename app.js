const express = require("express")
const session = require("express-session")
const passport = require("passport")
const bcryptjs = require("bcryptjs")

const PGStore = require('connect-pg-simple')(session)

const pool = require("./db/pool")
const db = require("./db/queries")

// ----- GENERAL SETUP -----

require("dotenv").config()

// Create express application
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// ----- SESSION SETUP ------

// We need to create the "session" table in our database. psql <mydatabase> < node_modules/connect-pg-simple/table.sql
const sessionStore = new PGStore({
  pool : pool
})

app.use(session({  // Session has data stored in the server
  secret: process.env.SECRET, 
  resave: false, 
  saveUninitialized: true,
  store: sessionStore, 
  cookie: { // Cookie has data stored in the browser
    maxAge: 1000 * 60 * 60 * 24 // Equals 1 day
  }
}))


const LocalStrategy = require('passport-local').Strategy







// VIEWS
const path = require("node:path")
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")



app.use(passport.session())



app.use((err, req, res, next) => {
  console.error(err)
  res.status(err.statusCode || 500).send(err.message)
})

// PASSPORT
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await db.getUserFromUsername(username)

      if (!user) {
        return done(null, false, { message: "Incorrect username" })
      }

      const match = await bcryptjs.compare(password, user.password)
      if (!match) {
        return done(null, false, { message: "Incorrect password" })
      }
      return done(null, user)
    } catch(error) {
      return done(error)
    }
  })
)

passport.serializeUser((user, done) => {
  done(null, user.id)
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.getUserFromID(id)
    done(null, user)
  } catch(err) {
    done(err)
  }
})

// ROUTES
const signUpRouter = require("./routes/sign-up-router")
const logInRouter = require("./routes/log-in-router")
const logOutRouter = require("./routes/log-out-router")
const messagesRouter = require("./routes/messages-router")

app.use("/sign-up", signUpRouter)
app.use("/log-in", logInRouter)
app.use("/log-out", logOutRouter)
app.use("/messages", messagesRouter)


app.get("/", (req, res) => {
    res.render("index", { title: "Home" })
})


const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}!`)
})
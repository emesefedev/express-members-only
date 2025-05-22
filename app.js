const express = require("express")
const session = require("express-session")
const passport = require("passport")

const PGStore = require('connect-pg-simple')(session)

const pool = require("./db/pool")
const routes = require("./routes")

// ----- GENERAL SETUP -----

require("dotenv").config()

// Create express application
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// ----- VIEWS -----

const path = require("node:path")
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")

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

// ----- PASSPORT AUTHENTICATION ------

require("./config/passport")

app.use(passport.initialize())
app.use(passport.session())

app.use((req, res, next) => {
  console.log(req.session)
  console.log(req.user)
  next()
})

// ----- ROUTES ------

app.use(routes) 

// ----- ERROR MIDDLEWARE ------

app.use((err, req, res, next) => {
  console.error(err)
  res.status(err.statusCode || 500).send(err.message)
})

// ----- SERVER ------

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}!`)
})
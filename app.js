require("dotenv").config()
const express = require("express")
const app = express();

app.get("/", (req, res) => res.send("Hello, world!"))

app.use((err, req, res, next) => {
  console.error(err)
  res.status(err.statusCode || 500).send(err.message)
});

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}!`)
})
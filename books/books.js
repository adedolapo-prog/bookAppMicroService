//initializing express
const express = require("express")
const mongoose = require("mongoose")
const app = express()
require("dotenv").config({ path: __dirname + "/.env" })

const port = 3900

try {
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  console.log("DB connected")
} catch (err) {
  console.log(err)
  process.exit(1)
}

//routes
app.get("/", async (req, res) => {
  res.send("This is our own endpoint")
})

app.listen(port, () => {
  console.log(`server is running on port ${port}`)
})

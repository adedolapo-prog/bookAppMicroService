//initializing express
const express = require("express")
const mongoose = require("mongoose")
const app = express()
require("dotenv").config({ path: __dirname + "/.env" })
const customerRoutes = require("./routes")

const port = 4000

//initializing parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

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
  res.send("This is our customer endpoint")
})

app.use("/customers", customerRoutes)

app.listen(port, () => {
  console.log(`customer server is running on port ${port}`)
})

const express = require("express")
const router = express.Router()
const { Book } = require("../schema/bookSchema")

router.post("/", async (req, res) => {
  const book = new Book(req.body)

  book.save((err, book) => {
    if (err) {
      return res.status(400).json({ success: false, err, data: [] })
    }
    return res.status(200).json({ success: true, data: book })
  })
})

module.exports = router

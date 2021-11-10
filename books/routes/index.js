const express = require("express")
const router = express.Router()
const { Book } = require("../schema/bookSchema")
const { queryConstructor } = require("../utils")

router.post("/", async (req, res) => {
  const book = new Book(req.body)

  book.save((err, book) => {
    if (err) {
      return res.status(400).json({ success: false, err, data: [] })
    }
    return res.status(200).json({ success: true, data: book })
  })
})

router.get("/", async (req, res) => {
  try {
    let { error, params, limit, skip, sort } = await queryConstructor(
      req.query,
      "createdAt",
      "Book"
    )
    if (error) {
      return res.status(400).json({ success: false, error, data: [] })
    }

    let book = await Book.find({ ...params })
      .skip(skip)
      .limit(limit)
      .sort(sort)
    let totalBooks = await Book.find({ ...params }).countDocuments()
    return res.status(200).json({ success: true, data: { totalBooks, book } })
  } catch (err) {
    return res.status(400).json({ success: false, err, data: [] })
  }
})

module.exports = router

const express = require("express")
const router = express.Router()
const { Book } = require("../schema/bookSchema")
const { queryConstructor } = require("../utils")

router.post("/", async (req, res) => {
  const book = new Book(req.body)

  book.save((err, book) => {
    if (err) {
      return res.status(400).json({
        message: "Something went wrong",
        success: false,
        err,
        data: [],
      })
    }
    return res
      .status(200)
      .json({ message: "Book successfully created", success: true, data: book })
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
      return res.status(400).json({
        message: "Something went wrong",
        success: false,
        error,
        data: [],
      })
    }

    let book = await Book.find({ ...params })
      .skip(skip)
      .limit(limit)
      .sort(sort)
    let totalBooks = await Book.find({ ...params }).countDocuments()
    return res.status(200).json({
      message: "Book successfully fetched",
      success: true,
      data: { totalBooks, book },
    })
  } catch (err) {
    return res
      .status(400)
      .json({ message: "Something went wrong", success: false, err, data: [] })
  }
})

router.put("/:id", async (req, res) => {
  Book.updateOne(
    { _id: req.params.id },
    { $set: { ...req.body } },
    (err, success) => {
      if (err) {
        return res.status(400).json({
          message: "Something went wrong",
          success: false,
          err,
          data: [],
        })
      }

      return res.status(200).json({
        message: "Book successfully updated",
        success: true,
        data: success,
      })
    }
  )
})

router.delete("/:id", async (req, res) => {
  Book.deleteOne({ _id: req.params.id }, (err, success) => {
    if (err) {
      return res.status(400).json({
        message: "Something went wrong",
        success: false,
        err,
        data: [],
      })
    }

    return res.status(200).json({
      message: "Book successfully deleted",
      success: true,
      data: success,
    })
  })
})

module.exports = router

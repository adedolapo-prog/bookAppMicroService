const mongoose = require("mongoose")
const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    pagesNumber: {
      type: Number,
      required: true,
    },
    publisher: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

const book = mongoose.model("Book", bookSchema, "book")

module.exports = { Book: book }

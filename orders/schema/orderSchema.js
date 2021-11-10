const mongoose = require("mongoose")
const orderSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Customer",
    },
    bookId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Book",
    },
    initialDate: {
      type: Date,
      required: true,
    },
    delivery: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
)

const order = mongoose.model("Order", orderSchema, "order")

module.exports = { Order: order }

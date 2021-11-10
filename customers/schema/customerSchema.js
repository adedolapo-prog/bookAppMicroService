const mongoose = require("mongoose")
const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

const customer = mongoose.model("Customer", customerSchema, "customer")

module.exports = { Customer: customer }

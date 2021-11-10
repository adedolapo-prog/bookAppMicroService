const express = require("express")
const router = express.Router()
const { Customer } = require("../schema/customerSchema")
const { queryConstructor } = require("../utils")

router.post("/", async (req, res) => {
  const customer = new Customer(req.body)

  customer.save((err, book) => {
    if (err) {
      return res.status(400).json({
        message: "Something went wrong",
        success: false,
        err,
        data: [],
      })
    }
    return res.status(200).json({
      message: "Customer successfully created",
      success: true,
      data: customer,
    })
  })
})

router.get("/", async (req, res) => {
  try {
    let { error, params, limit, skip, sort } = await queryConstructor(
      req.query,
      "createdAt",
      "Customer"
    )
    if (error) {
      return res.status(400).json({
        message: "Something went wrong",
        success: false,
        error,
        data: [],
      })
    }

    let customer = await Customer.find({ ...params })
      .skip(skip)
      .limit(limit)
      .sort(sort)
    let totalCustomers = await Customer.find({ ...params }).countDocuments()
    return res.status(200).json({
      message: "Customer successfully fetched",
      success: true,
      data: { totalCustomers, customer },
    })
  } catch (err) {
    return res
      .status(400)
      .json({ message: "Something went wrong", success: false, err, data: [] })
  }
})

router.put("/:id", async (req, res) => {
  Customer.updateOne(
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
        message: "Customer successfully updated",
        success: true,
        data: success,
      })
    }
  )
})

router.delete("/:id", async (req, res) => {
  Customer.deleteOne({ _id: req.params.id }, (err, success) => {
    if (err) {
      return res.status(400).json({
        message: "Something went wrong",
        success: false,
        err,
        data: [],
      })
    }

    return res.status(200).json({
      message: "Customer successfully deleted",
      success: true,
      data: success,
    })
  })
})

module.exports = router

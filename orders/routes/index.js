const express = require("express")
const router = express.Router()
const { Order } = require("../schema/orderSchema")
const { queryConstructor } = require("../utils")

router.post("/", async (req, res) => {
  const order = new Order(req.body)

  order.save((err, order) => {
    if (err) {
      return res.status(400).json({
        message: "Something went wrong",
        success: false,
        err,
        data: [],
      })
    }
    return res.status(200).json({
      message: "Order successfully created",
      success: true,
      data: order,
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

    let order = await Order.find({ ...params })
      .skip(skip)
      .limit(limit)
      .sort(sort)
    let totalOrders = await Order.find({ ...params }).countDocuments()
    return res.status(200).json({
      message: "Order successfully fetched",
      success: true,
      data: { totalOrders, order },
    })
  } catch (err) {
    return res
      .status(400)
      .json({ message: "Something went wrong", success: false, err, data: [] })
  }
})

router.put("/:id", async (req, res) => {
  Order.updateOne(
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
        message: "Order successfully updated",
        success: true,
        data: success,
      })
    }
  )
})

router.delete("/:id", async (req, res) => {
  Order.deleteOne({ _id: req.params.id }, (err, success) => {
    if (err) {
      return res.status(400).json({
        message: "Something went wrong",
        success: false,
        err,
        data: [],
      })
    }

    return res.status(200).json({
      message: "Order successfully deleted",
      success: true,
      data: success,
    })
  })
})

module.exports = router

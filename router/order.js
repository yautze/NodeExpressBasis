import express from "express"
import * as order from '../controller/order'
const router = express.Router()

router.post("/:num", order.Order)

module.exports = router
import express from "express"
import * as test from '../controller/test'
const router = express.Router()

router.get("/", test.Test)

module.exports = router
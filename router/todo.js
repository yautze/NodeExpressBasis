import express from "express"
import * as todo from '../controller/todo'
const router = express.Router()

router.post("/", todo.Create)
router.get("/", todo.GetList)
router.get("/:status", todo.GetByStatus)
router.delete("/:id", todo.Delete)
router.put("/:id", todo.UpdateIsDone)
router.put("/info/:id", todo.UpdateInfo)

module.exports = router
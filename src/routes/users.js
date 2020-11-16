const express = require("express")
const controller = require("../controller/users")
const admin = require("../middleware/admin")
const Route = express.Router()

Route.get("/", controller.getAll)
Route.get("/email", controller.getByUser)
Route.get("/:id", controller.getById)
Route.post("/", controller.addUsers)
Route.delete("/", controller.delUsers)

module.exports = Route
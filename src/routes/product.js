const express = require("express")
const controller = require("../controller/product")
const admin = require("../middleware/admin")
const chache = require("../middleware/chace")
const upload = require("../middleware/upload")
const Route = express.Router()

Route.get("/", chache, controller.all)
Route.post("/", upload.single("images"), controller.add)
Route.put("/", admin, controller.edit)
Route.delete("/", controller.delete)
Route.get("/search", controller.search)
Route.get("/:sort", controller.sort)

module.exports = Route
const express = require("express")
const controller = require("../controller/menu")
const Route = express.Router()

Route.get("/", controller.all)


module.exports = Route
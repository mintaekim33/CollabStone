var express = require("express");
var router = express.Router();
var prioritiesController = require("../controllers/priorities");

// POST /priorities/create create a priority
router.post("/create", prioritiesController.createPriority);

// TEST CREATE USING POSTMAN
module.exports = router;

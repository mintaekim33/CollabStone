var express = require("express");
var router = express.Router();
var expensesController = require("../controllers/expenses");

// POST /priorities/create create a priority
router.post("/create", expensesController.createExpense);

// TEST CREATE USING POSTMAN
module.exports = router;

var express = require("express");
var router = express.Router();
var expensesController = require("../controllers/expenses");

// POST /expenses/create create an expense
router.post("/create", expensesController.createExpense);

// GET /expenses/getAll create an expense
router.get("/getAll", expensesController.getExpenses);

// clear DB
router.delete("/deleteAll", expensesController.deleteAll);
module.exports = router;

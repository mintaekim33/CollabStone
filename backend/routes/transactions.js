var express = require("express");
var router = express.Router();
var transactionsController = require("../controllers/transactions");
const securityMiddleware = require("../middleware/security");

// POST /transactions/create create a transaction
router.post("/create", transactionsController.createTransaction);

// GET /transactions/getAll get transactions
router.get(
  "/getAll",
  //   securityMiddleware.checkLogin,
  transactionsController.getTransactions
);

// GET /transactions/get/:id get a transaction
router.get("/get/:id", transactionsController.getTransaction);

// PUT /transactions/edit/:id edit a transaction
router.put(
  "/edit/:id",
  //   securityMiddleware.checkPermission,
  transactionsController.editTransaction
);

// DELETE /transactions/delete/:id delete a transaction
router.delete("/delete/:id", transactionsController.deleteTransaction);

// clear DB
router.delete("/deleteAll", transactionsController.deleteAll);

module.exports = router;

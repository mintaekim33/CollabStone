const modelExpenses = require("../models/expenses");

module.exports = {
  createExpense,
};

async function createExpense(req, res) {
  try {
    const expenseData = req.body;

    // Validate userId
    //   const user = await modelUsers.getUser(ExpenseData.userId);
    //   if (!user) {
    //     return res.status(400).json({ errorMsg: "Invalid user ID" });
    //   }

    const expense = await modelExpenses.createExpense(expenseData);
    res.status(201).json(expense); // Return the created expense
  } catch (err) {
    res.status(500).json({ errorMsg: err.message });
  }
}

const modelExpenses = require("../models/expenses");

module.exports = {
  createExpense,
  getExpenses,
  editExpense,
  deleteAll,
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

async function getExpenses(req, res) {
  try {
    const data = await modelExpenses.getExpenses();
    res.json(data);
  } catch (err) {
    res.status(500).json({ errorMsg: err.message });
  }
}

async function editExpense(req, res) {
  const expenseId = req.params.expenseId;
  console.log("expense ID: ", expenseId);
  const data = req.body;
  console.log("Body: ", data);

  try {
    const updatedExpense = await modelExpenses.editExpense(expenseId, data);
    console.log("RESPONSE: ", updatedExpense);
    res.json(updatedExpense);
  } catch (err) {
    res.status(500).json({ errorMsg: err.message });
  }
}

async function deleteAll(req, res) {
  try {
    const data = await modelExpenses.deleteAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ errorMsg: err.message });
  }
}

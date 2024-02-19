const daoExpenses = require("../daos/expenses");

module.exports = {
  createExpense,
  getExpenses,
  editExpense,
  deleteAll,
};

function createExpense(param) {
  return daoExpenses.create(param);
}

function getExpenses() {
  return daoExpenses.find({});
}

function editExpense(expenseId, data) {
  return daoExpenses.findByIdAndUpdate(expenseId, data, { new: true });
}

function deleteAll() {
  return daoExpenses.deleteMany({});
}

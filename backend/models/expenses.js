const daoExpenses = require("../daos/expenses");

module.exports = {
  createExpense,
  getExpenses,
};

function createExpense(param) {
  return daoExpenses.create(param);
}

function getExpenses() {
  return daoExpenses.find({});
}

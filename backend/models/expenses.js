const daoExpenses = require("../daos/expenses");

module.exports = {
  createExpense,
  getExpenses,
  deleteAll,
};

function createExpense(param) {
  return daoExpenses.create(param);
}

function getExpenses() {
  return daoExpenses.find({});
}

function deleteAll() {
  return daoExpenses.deleteMany({});
}

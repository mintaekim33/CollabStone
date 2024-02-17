const daoExpenses = require("../daos/expenses");

module.exports = {
  createExpense,
};

function createExpense(param) {
  return daoExpenses.create(param);
}

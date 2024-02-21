const daoTransactions = require("../daos/transactions");

module.exports = {
  createTransaction,
  getTransactions,
  getTransaction,
  editTransaction,
  deleteAll,
};

function createTransaction(param) {
  return daoTransactions.create(param);
}

function getTransactions() {
  return daoTransactions.find({});
}

function getTransaction(id) {
  return daoTransactions.findById(id);
}

function editTransaction(id, data) {
  return daoTransactions.findByIdAndUpdate(id, data, { new: true });
}

function deleteAll() {
  return daoTransactions.deleteMany({});
}

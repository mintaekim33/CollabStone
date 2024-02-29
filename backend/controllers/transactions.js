const modelTransactions = require("../models/transactions");

module.exports = {
  createTransaction,
  getTransactions,
  getTransaction,
  editTransaction,
  deleteTransaction,
};

async function createTransaction(req, res) {
  try {
    const body = req.body;
    const data = await modelTransactions.createTransaction(body);
    res.status(201).json(data); // Return the created transaction
  } catch (err) {
    res.status(500).json({ errorMsg: err.message });
  }
}

async function getTransactions(req, res) {
  try {
    const data = await modelTransactions.getTransactions(req.user._id);
    // console.log("get transactions: ", data);
    // filter transaction items by user id
    // const filtered = data.filter((x) => {
    //   return x.userId.toString() === req.user._id;
    // });

    res.json(data);
    // res.json(filtered);
  } catch (err) {
    res.status(500).json({ errorMsg: err.message });
  }
}

async function getTransaction(req, res) {
  const id = req.params.id;
  try {
    const data = await modelTransactions.getTransaction(id);
    res.json(data);
  } catch (err) {
    res.status(500).json({ errorMsg: err.message });
  }
}

async function editTransaction(req, res) {
  const id = req.params.id;
  const data = req.body;
  try {
    const updatedTransaction = await modelTransactions.editTransaction(
      id,
      data
    );
    res.json(updatedTransaction);
  } catch (err) {
    res.status(500).json({ errorMsg: err.message });
  }
}

async function deleteTransaction(req, res) {
  const id = req.params.id;
  try {
    const deletedTransaction = await modelTransactions.deleteTransaction(id);
    res.json(deletedTransaction);
  } catch (err) {
    res.status(500).json({ errorMsg: err.message });
  }
}

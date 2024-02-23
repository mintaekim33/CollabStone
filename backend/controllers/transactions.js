const modelTransactions = require("../models/transactions");

module.exports = {
  createTransaction,
  getTransactions,
  getTransaction,
  editTransaction,
  deleteTransaction,
  deleteAll,
};

async function createTransaction(req, res) {
  try {
    const body = req.body;

    // Validate userId
    //   const user = await modelUsers.getUser(data.userId);
    //   if (!user) {
    //     return res.status(400).json({ errorMsg: "Invalid user ID" });
    //   }

    const data = await modelTransactions.createTransaction(body);
    res.status(201).json(data); // Return the created transaction
  } catch (err) {
    res.status(500).json({ errorMsg: err.message });
  }
}

async function getTransactions(req, res) {
  try {
    const data = await modelTransactions.getTransactions();
    res.json(data);
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
  // console.log("transaction ID: ", id);
  const data = req.body;
  // console.log("Body: ", data);

  try {
    const updatedTransaction = await modelTransactions.editTransaction(
      id,
      data
    );
    // console.log("RESPONSE: ", updatedTransaction);
    res.json(updatedTransaction);
  } catch (err) {
    res.status(500).json({ errorMsg: err.message });
  }
}

async function deleteTransaction(req, res) {
  const id = req.params.id;
  console.log("transaction ID: ", id);

  try {
    const deletedTransaction = await modelTransactions.deleteTransaction(id);
    // console.log("RESPONSE: ", deletedTransaction);
    res.json(deletedTransaction);
  } catch (err) {
    res.status(500).json({ errorMsg: err.message });
  }
}

async function deleteAll(req, res) {
  try {
    const data = await modelTransactions.deleteAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ errorMsg: err.message });
  }
}

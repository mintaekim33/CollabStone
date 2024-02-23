const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
  // referencing user model
  //   userId: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "Users",
  //     required: true,
  //   },
  date: {
    type: Date,
    required: true,
    // default: new Date(), // current date
    // ISODate("2024-02-28T00:00:00Z"),
  },
  type: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  note: {
    type: String,
  },
});

module.exports = mongoose.model("Transactions", TransactionSchema);

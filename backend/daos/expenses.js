const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const expenseSchema = new Schema({
  // referencing user model
  //   userId: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "Users",
  //     required: true,
  //   },
  date: {
    type: Date,
    default: new Date(), // current date
    // ISODate("2024-02-28T00:00:00Z"),
  },
  category: {
    type: String,
    required: true,
    default: "Work",
  },
  paymentMethod: {
    type: String,
    required: true,
    default: "Cash",
  },
  amount: {
    type: Number,
    required: true,
  },
  note: {
    type: String,
  },
});

module.exports = mongoose.model("Expenses", expenseSchema);

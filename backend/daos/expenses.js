const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const expenseSchema = new Schema({
  // referencing user model
  //   userId: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "Users",
  //     required: true,
  //   },
  category: {
    type: String,
    required: true,
    default: "work",
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

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TransactionSchema = new Schema(
  {
    // referencing user model
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    type: {
      type: String,
      required: true,
      default: "Expense",
    },
    category: {
      type: String,
      required: true,
      // default: function () {
      //   // Conditional default based on the value of the 'type' field
      //   if (this.type === "Income") {
      //     return "Salary";
      //   } else {
      //     return "Food";
      //   }
      // },
    },
    amount: {
      type: Number,
      required: true,
    },
    note: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Transactions", TransactionSchema);

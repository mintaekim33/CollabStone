const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const prioritySchema = new Schema({
  // referencing user model
  //   userId: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "Users",
  //     required: true,
  //   },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: "pending",
  },
  category: {
    type: String,
    required: true,
  },
  deadline: {
    type: Date,
    // required: true,
    // ISODate("2024-02-28T00:00:00Z"),
  },
});

module.exports = mongoose.model("Priorities", prioritySchema);

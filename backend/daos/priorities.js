const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const prioritySchema = new Schema({
  // referencing user model
  //   userId: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "Users",
  //     required: true,
  //   },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  deadline: {
    type: Date,
    // required: true,
  },
});

module.exports = mongoose.model("Priorities", prioritySchema);

const daoPriorities = require("../daos/priorities");

module.exports = {
  createPriority,
};

function createPriority(param) {
  return daoPriorities.create(param);
}

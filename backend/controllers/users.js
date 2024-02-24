const modelUsers = require("../models/users");

module.exports = {
  createUser,
  //   getLoginDetails,
  //   loginUser,
  //   getUser,
  //   updateUser,
  //   getReviews,
  //   logoutUser,
};

async function createUser(req, res) {
  try {
    console.log("create user controller");
    const user = await modelUsers.createUser(req.body);
    res.json({ user });
  } catch (err) {
    res.status(500).json({ errorMsg: err.message });
  }
}

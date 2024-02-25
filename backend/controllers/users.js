const modelUsers = require("../models/users");

module.exports = {
  createUser,
  getLoginDetails,
  loginUser,
  logoutUser,
  //   getUser,
  //   updateUser,
  //   getReviews,
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

async function getLoginDetails(req, res) {
  try {
    console.log("contrl ", req.query);
    const loginDetails = await modelUsers.getLoginDetails(req.query);
    if (loginDetails.success != true) {
      res.status(400).json({ errorMsg: loginDetails.error });
      return;
    }
    res.json(loginDetails.data); /// contains _id, salt, iterations
  } catch (err) {
    res.status(500).json({ errorMsg: err.message });
  }
}

async function loginUser(req, res) {
  try {
    const token = await modelUsers.loginUser(req.body);
    console.log("token", token);
    res.json(token);
  } catch (err) {
    res.status(500).json({ errorMsg: err.message });
  }
}

async function logoutUser(req, res) {
  try {
    console.log(req.body);
    console.log("req user: ", req.user);
    const result = await modelUsers.logoutUser(req.body);
    console.log("log out result: ", result);
    if (!result.success) {
      res.status(400).json({ errorMsg: result.error });
      return;
    }
    res.json(result.data);
  } catch (err) {
    res.status(500).json({ errorMsg: err.message });
  }
}

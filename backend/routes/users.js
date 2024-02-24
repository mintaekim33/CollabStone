var express = require("express");
var router = express.Router();
var usersController = require("../controllers/users");
// base path: /users
// POST /users/register register a user
router.post("/register", usersController.createUser);

// GET /users/login get login details
router.get("/login", usersController.getLoginDetails);
// POST /users/login log a user in
router.post("/login", usersController.loginUser);

module.exports = router;

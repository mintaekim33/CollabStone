var express = require("express");
var router = express.Router();
var usersController = require("../controllers/users");
// base path: /users
// POST /users/register register a user
router.post("/register", usersController.createUser);

module.exports = router;

var express = require("express");
var router = express.Router();
var usersController = require("../controllers/users");
const securityMiddleware = require("../middleware/security");

// base path: /users
// POST /users/register register a user
router.post("/register", usersController.createUser);

// GET /users/login get login details
router.get("/login", usersController.getLoginDetails);
// POST /users/login log a user in
router.post("/login", usersController.loginUser);

// POST /users/logout log a user out
router.post(
  "/logout",
  securityMiddleware.checkPermission,
  usersController.logoutUser
);

module.exports = router;

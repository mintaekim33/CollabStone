const utilSecurity = require("../util/security");

module.exports = {
  checkJWT,
  checkLogin,
  checkPermission,
};

// authenticate incoming requests by verifying if the token is valid
// and set req.user to decoded info
function checkJWT(req, res, next) {
  let token = req.get("Authorization") || req.query.token;
  if (token) {
    token = token.replace("Bearer ", "");
    try {
      const decoded = utilSecurity.verifyJWT(token);
      req.user = decoded.payload; // Set the user information from the payload property
    } catch (err) {
      req.user = null;
    }
  } else {
    console.error("No token provided");
    req.user = null;
  }
  next();
}

function checkLogin(req, res, next) {
  // Status code of 401 is Unauthorized
  if (!req.user) return res.status(401).json("Unauthorized - check login");
  next();
}

function checkPermission(req, res, next) {
  if (!req.user) return res.status(401).json("Unauthorized - check permission");

  const userIdFromRequest =
    req.body._id || req.body.userId || req.query.userId || req.params.userId;

  // User ID check for logout operation
  if (
    req.path.endsWith("/logout") &&
    userIdFromRequest !== req.user._id.toString()
  ) {
    return res.status(403).json("Forbidden");
  }
  // User has permission
  next();
}

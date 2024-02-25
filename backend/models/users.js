const daoUsers = require("../daos/users");
const utilSecurity = require("../util/security");

module.exports = {
  createUser,
  getLoginDetails,
  loginUser,
  logoutUser,
  //   getUser,
  //   updateUser,
  //   getReviews,
};

async function createUser(body) {
  const user = await daoUsers.findOne({ email: body.email });
  if (user) {
    return {
      success: false,
      error: "This email is already registered with an account",
    };
  }
  const newUser = await daoUsers.create(body);
  return { success: true, data: newUser, done: "Thanks for registering!" };
}

async function getLoginDetails(queryFields) {
  // return these fields from this function
  const loginFields = {
    name: 1,
    salt: 1,
    iterations: 1,
  };
  if (!queryFields.hasOwnProperty("email")) {
    return { success: false, error: "missing email" };
  }
  // url decode email '@' -> %40
  const userEmail = decodeURIComponent(queryFields.email);
  console.log("decoded email: ", userEmail);
  const loginFieldsRes = await daoUsers.findOne(
    { email: userEmail },
    loginFields
  );
  return { success: true, data: loginFieldsRes };
}

async function loginUser(body) {
  if (!body.hasOwnProperty("email")) {
    return { success: false, error: "Please type your email" };
  }
  if (!body.hasOwnProperty("password")) {
    return { success: false, error: "Please type your password" };
  }

  const user = await daoUsers.findOne({
    email: body.email,
    password: body.password,
  });
  if (user == null || Object.keys(user).length == 0) {
    return { success: false, error: "Invalid email/password" };
  }

  const jwtPayload = {
    _id: user._id,
    user: user.name,
    email: user.email,
    is_admin: user.is_admin,
  };
  const token = utilSecurity.createJWT(jwtPayload);
  const expiry = utilSecurity.getExpiry(token);
  daoUsers.updateOne(
    { email: body.email },
    { token: token, expire_at: expiry }
  );
  return { success: true, data: token };
}

async function logoutUser(body) {
  if (!body.hasOwnProperty("email")) {
    return { success: false, error: "missing email" };
  }
  daoUsers.updateOne({ email: body.email }, { token: null, expire_at: null });
  return { success: true, data: "logout successful" };
}

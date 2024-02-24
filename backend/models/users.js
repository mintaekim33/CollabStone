const daoUsers = require("../daos/users");
// const daoReviews = require("../daos/reviews");
// const utilSecurity = require("../util/security");

module.exports = {
  createUser,
  //   loginUser,
  //   getUser,
  //   updateUser,
  //   getReviews,
  //   getLoginDetails,
  //   logoutUser,
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

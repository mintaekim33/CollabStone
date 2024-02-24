import * as usersAPI from "../api/users";
// import { getToken } from "../util/security";

export async function signUp(userData: any) {
  // Delegate the network request code to the users-api.js API module
  // which will ultimately return a JSON Web Token (JWT)
  const token = await usersAPI.signUp(userData);
  // return whatever is sent back by the server
  return token;
}
import * as usersAPI from "../api/users";
import { getToken } from "../util/security";

export async function signUp(userData: any) {
  // Delegate the network request code to the users-api.js API module
  // which will ultimately return a JSON Web Token (JWT)
  const token = await usersAPI.signUp(userData);
  // return whatever is sent back by the server
  return token;
}

export async function getLoginDetails(email: string) {
  // Delegate the network request code to the users-api.js API module
  // which will ultimately return a JSON Web Token (JWT)
  const loginDetails = await usersAPI.getLoginDetails(email);
  // return whatever is sent back by the server
  return loginDetails;
}

export async function loginUser(userData: any) {
  // Delegate the network request code to the users-api.js API module
  // which will ultimately return a JSON Web Token (JWT)
  const res = await usersAPI.loginUser(userData);
  // Baby step by returning whatever is sent back by the server
  return res;
}

export function getUser() {
  const token = getToken();
  // If there's a token, return the user in the payload, otherwise return null
  return token ? JSON.parse(atob(token.split(".")[1])).payload.user : null;
}

export function getUserPayload() {
  const token = getToken();
  // If there's a token, return the user in the payload, otherwise return null
  return token ? JSON.parse(atob(token.split(".")[1])).payload : null;
}

// export async function logoutUser() {
//   const token = getToken();
//   if (token) {
//     const res = await usersAPI.logoutUser(
//       token,
//       JSON.parse(atob(token.split(".")[1])).payload
//       // log this out
//     );
//     // removeToken();
//     localStorage.removeItem("token");

//     window.location.reload();
//     return res;
//   }
//   return true;
// }
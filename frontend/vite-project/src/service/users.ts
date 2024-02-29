import * as usersAPI from "../api/users";
import { getToken } from "../util/security";

export async function signUp(userData: any) {
  const token = await usersAPI.signUp(userData);
  return token;
}

export async function getLoginDetails(email: string) {
  const loginDetails = await usersAPI.getLoginDetails(email);
  return loginDetails;
}

export async function loginUser(userData: any) {
  const res = await usersAPI.loginUser(userData);
  return res;
}

export function getUser() {
  const token = getToken();
  return token ? JSON.parse(atob(token.split(".")[1])).payload.user : null;
}

export function getUserPayload() {
  const token = getToken();
  return token ? JSON.parse(atob(token.split(".")[1])).payload : null;
}

export async function logoutUser() {
  const token = getToken();
  if (token) {
    const decodedTokenPayload = JSON.parse(atob(token.split(".")[1]))?.payload;
    const res = await usersAPI.logoutUser(token,decodedTokenPayload);
    localStorage.removeItem("token");
    return res;
  }
  return true;
}
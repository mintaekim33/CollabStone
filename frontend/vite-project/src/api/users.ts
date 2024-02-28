const BASE_URL = "https://dollaradar-webservice.onrender.com/users";
// const BASE_URL = "http://localhost:3000/users";

export async function signUp(userData: any) {
    const createURL = BASE_URL + "/register";
    const res = await fetch(createURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    if (res.ok) {
      const data = await res.json();
      if (data.user.success === true) {
        return data.user.done;
      } else {
        const errorMsg = data.user.error;
        return errorMsg;
      }
    } else {
      throw new Error("Invalid Sign Up");
    }
  }

  export async function getLoginDetails(email: string) {
    const searchParams = new URLSearchParams({ email: email });
    const getLoginDetailsURL = BASE_URL + "/login?" + searchParams;
    const res = await fetch(getLoginDetailsURL, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (res.ok) {
      const data = await res.json();
      return data;
    } else {
      throw new Error("Invalid User");
    }
  }

export async function loginUser(userData: any) {
  const loginURL = BASE_URL + "/login";
  const res = await fetch(loginURL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  if (res.ok) {
    const data = await res.json();
    return data;
  } else {
    throw new Error("Invalid Login");
  }
}

export async function logoutUser(token: string, payload: any) {
  const logoutURL = BASE_URL + "/logout";
  const res = await fetch(logoutURL, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: token },
    body: JSON.stringify(payload),
  });
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Invalid Logout");
  }
}
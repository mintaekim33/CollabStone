const BASE_URL = "https://dollaradar-webservice.onrender.com/users";

export async function signUp(userData: any) {
    // Fetch uses an options object as a second arg to make requests
    // other than basic GET requests, include data, headers, etc.
    const createURL = BASE_URL + "/register";
    const res = await fetch(createURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // Fetch requires data payloads to be stringified
      // and assigned to a body property on the options object
      body: JSON.stringify(userData),
    });
    // Check if request was successful
    if (res.ok) {
      // res.json() will resolve to the JWT
      const data = await res.json();
      console.log("SIGN UP RESPONSE: ", data)
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
    // Fetch uses an options object as a second arg to make requests
    // other than basic GET requests, include data, headers, etc.
    const searchParams = new URLSearchParams({ email: email });
    const getLoginDetailsURL = BASE_URL + "/login?" + searchParams;
    // console.log(getLoginDetailsURL)
    const res = await fetch(getLoginDetailsURL, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      // Fetch requires data payloads to be stringified
      // and assigned to a body property on the options object
    });
    // Check if request was successful
    if (res.ok) {
      // res.json() will resolve to the JWT
      const data = await res.json();
  
      return data;
    } else {
      throw new Error("Invalid User");
    }
  }


export async function loginUser(userData: any) {
  // Fetch uses an options object as a second arg to make requests
  // other than basic GET requests, include data, headers, etc.

  // console.log("login - before api", userData)
  const loginURL = BASE_URL + "/login";
  const res = await fetch(loginURL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    // Fetch requires data payloads to be stringified
    // and assigned to a body property on the options object
    body: JSON.stringify(userData),
  });
    // console.log("login - after api", userData)
  // Check if request was successful
  if (res.ok) {
    // res.json() will resolve to the JWT
    const data = await res.json();

    return data;
  } else {
    throw new Error("Invalid Login");
  }
}

export async function logoutUser(token: string, payload: any) {
  console.log("API layer ToKEN: ", token)
  const logoutURL = BASE_URL + "/logout";
  const res = await fetch(logoutURL, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: token },
    body: JSON.stringify(payload),
  });
  // Check if request was successful
  if (res.ok) {
    // res.json() will resolve to the JWT ??? why JWT here
    return res.json();
  } else {
    throw new Error("Invalid Logout");
  }
}
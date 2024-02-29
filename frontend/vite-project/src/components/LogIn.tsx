import { useEffect, useState } from "react";
import { Container, Row, Spinner } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { getLoginDetails, getUser, loginUser } from "../service/users";
import { getToken, hashDataWithSaltRounds, storeToken } from "../util/security";
import { Link, useNavigate } from "react-router-dom";

interface FormState {
  [key: string]: string; // Define the structure of the form state object
}

function LogIn(props: any) {
  const { setUserId, setUser, user, userId } = props;
  const [formState, setFormState] = useState<FormState>({});
  const [logInMessage, setLogInMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  function handleChange(evt: any) {
    const { name, value } = evt.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value, // Use computed property names to update the formState
    }));
  }

  async function handleSubmit(evt: any) {
    evt.preventDefault();
    // setLoading(true);

    try {
      const formData = { ...formState };
      const loginDetails = await getLoginDetails(formData.email); // retrieve name, salt, iterations
      // check if the form is filled and there is no login details retrieved
      if (Object.keys(formData).length !== 0 && loginDetails === null) {
        setLogInMessage("No such user registered");
      }

      if (loginDetails) {
        // hash password
        const hashedPassword = hashDataWithSaltRounds(
          formData.password,
          loginDetails.salt,
          loginDetails.iterations
        );
        formData.password = hashedPassword;

        // actually log in
        const token = await loginUser(formData);
        if (token.success === false) {
          setLogInMessage(token.error);
        } else {
          // store token in localStorage
          console.log("token: ", token);
          console.log("token data: ", token.data);
          storeToken(token.data);
        }
        setUser(getUser());

        // navigate to home
        navigate("/");

        console.log("user: ", user);
        console.log("userId: ", userId);
      }
      // const token = getToken();
      // if (token) {
      //   const payload = JSON.parse(atob(token.split(".")[1])).payload;
      //   if (payload && payload._id) {
      //     console.log("payload, ", payload);
      //     setUserId(payload._id);
      //   }
      // }

      // navigate to home
      // if (user) {
      //   navigate("/");
      //   // setLoading(false);
      // }
      // setIsLoggedIn(true);

      // console.log("user: ", user);
      // console.log("userId: ", userId);
    } catch (e) {
      console.error("Log in failed: ", e);
      setLoading(false);
    }
  }

  // useEffect(() => {
  //   navigate("/");
  // }, [isLoggedIn]);

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     navigate("/");
  //   }
  // }, [isLoggedIn, navigate]);

  return (
    <Container className=" flex justify-center items-center h-screen ">
      <Form
        className=" border border-gray w-full max-w-md bg-white shadow-md rounded-md p-4 p-sm-3"
        onSubmit={handleSubmit}
      >
        <h3 className="flex justify-center my-4">{logInMessage}</h3>
        <h2 className="text-2xl font-bold mb-6 flex justify-center">Sign In</h2>

        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            name="email"
            type="email"
            placeholder="Enter email"
            className="block w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            value={formState.email || ""}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            type="password"
            placeholder="Password"
            className="block w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            value={formState.password || ""}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {loading ? (
          <div className="flex justify-center ">
            <Spinner animation="border" role="status" variant="primary">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : (
          <Button
            variant="primary"
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Sign In
          </Button>
        )}

        <div className="flex justify-center mt-8">
          <div className=" flex flex-col justify-center text-center">
            <Row>Don't have an account?</Row>
            <Row>
              <Link to="/signup">Create account</Link>
            </Row>
          </div>
        </div>
      </Form>
    </Container>
  );
}

export default LogIn;

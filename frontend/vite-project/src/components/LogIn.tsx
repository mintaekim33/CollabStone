import { useState } from "react";
import { Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { getLoginDetails, getUser, loginUser } from "../service/users";
import { hashDataWithSaltRounds, storeToken } from "../util/security";
import { Link, useNavigate } from "react-router-dom";

interface FormState {
  [key: string]: string; // Define the structure of the form state object
}

function LogIn(props: any) {
  const { setUser } = props;
  const [formState, setFormState] = useState<FormState>({});
  const [logInMessage, setLogInMessage] = useState();
  const navigate = useNavigate();

  function handleChange(evt: any) {
    const { name, value } = evt.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value, // Use computed property names to update the formState
    }));
  }

  async function handleSubmit(evt: any) {
    try {
      evt.preventDefault();

      // console.log("form state: ", formState);
      const formData = { ...formState };
      // console.log("form data: ", formData);

      // console.log("form data before get login details", formData);
      const loginDetails = await getLoginDetails(formData.email); // retrieve name, salt, iterations
      // console.log("Login details retrieved: ", loginDetails);
      // console.log("form data after get login details", formData);
      // hash password
      const hashedPassword = hashDataWithSaltRounds(
        formData.password,
        loginDetails.salt,
        loginDetails.iterations
      );
      // console.log("Log In Hashed Password: ", hashedPassword);
      formData.password = hashedPassword;

      // actually log in
      const token = await loginUser(formData);
      console.log("token", token);
      if (token.success === false) {
        setLogInMessage(token.error);
      } else {
        // store token in localStorage
        storeToken(token.data);
      }
      // navigate to home
      setUser(getUser());
      navigate("/");

      // // retrieve user id from token
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <Container className=" flex justify-center items-center h-screen">
      <Form
        className="w-full max-w-md bg-white shadow-md rounded-md p-4 p-sm-3"
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
          />
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Sign In
        </Button>
        {/* {signedUp && (
      <Form.Text className="text-muted">Back to Log In</Form.Text>
    )} */}
        <Row>Don't have an account?</Row>
        <Row>
          <Link to="/signup">Create account</Link>
        </Row>
      </Form>
    </Container>
  );
}

export default LogIn;

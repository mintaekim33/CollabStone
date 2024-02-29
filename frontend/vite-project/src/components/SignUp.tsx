import { useState } from "react";
import { Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { hashData } from "../util/security";
import { signUp } from "../service/users";
import { Link } from "react-router-dom";

interface FormState {
  [key: string]: string; // Define the structure of the form state object
}

function SignUp() {
  const [formState, setFormState] = useState<FormState>({});
  const [signedUp, setSignedUp] = useState(false);
  const [signUpMessage, setSignUpMessage] = useState();

  function handleChange(evt: any) {
    const { name, value } = evt.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value, // Use computed property names to update the formState
    }));
  }

  function hashPassword() {
    var currForm = formState;
    if (currForm.password) {
      var hash = hashData(currForm.password);
      currForm.password = hash.hash;
      currForm.salt = hash.salt;
      currForm.iterations = hash.iterations;
    }
  }

  async function handleSubmit(evt: any) {
    try {
      evt.preventDefault();
      hashPassword();
      const formData = { ...formState };
      const user = await signUp(formData);
      setSignUpMessage(user); // display message
      setFormState({}); // clear the form
      setSignedUp(true); // toggle log in link
      // OR navigate to login page
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <Container className=" flex justify-center items-center h-screen">
      <Form
        className="border border-gray w-full max-w-md bg-white shadow-md rounded-md p-4 p-sm-3"
        onSubmit={handleSubmit}
      >
        <h3 className="flex justify-center my-4">{signUpMessage}</h3>
        <h2 className="text-2xl font-bold mb-6 flex justify-center">Sign Up</h2>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            name="name"
            type="text"
            placeholder="Enter name"
            className="block w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            value={formState.name || ""}
            onChange={handleChange}
          />
        </Form.Group>
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
          Sign Up
        </Button>
        {signedUp && (
          <Form.Text className="text-muted">
            <Link to="/login" className="no-underline text-black">
              Back to Log In
            </Link>
          </Form.Text>
        )}

        <div className="flex justify-center mt-8">
          <div className=" flex flex-col justify-center text-center">
            <Row>Already have an account?</Row>
            <Row>
              <Link to="/login">Sign in</Link>
            </Row>
          </div>
        </div>
      </Form>
    </Container>
  );
}

export default SignUp;

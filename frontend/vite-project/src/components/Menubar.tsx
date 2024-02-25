import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { logoutUser } from "../service/users";
import { Link } from "react-router-dom";

function Menubar(props: any) {
  const { user, setUser } = props;

  function handleLogOut() {
    logoutUser();
    setUser(null);
  }

  return (
    <Navbar className="bg-blue-300 h-24">
      <Container className="flex justify-between items-center">
        <Navbar.Brand className=" flex items-center justfiy-center">
          <Link to="/" className="no-underline">
            <p className=" text-white text-2xl md:text-3xl lg:text-4xl font-semibold font-link">
              dollaradar
            </p>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          {user ? (
            <>
              <Navbar.Text className="mr-4 text-white">
                Signed in as: <span className="font-semibold">{user}</span>
              </Navbar.Text>
              <Button
                className="text-blue-500 hover:text-blue-700"
                onClick={handleLogOut}
              >
                Log Out
              </Button>
            </>
          ) : (
            <Link to="/login">
              <Button variant="light">Log In</Button>
            </Link>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Menubar;

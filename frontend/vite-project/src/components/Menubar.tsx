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
      <Container>
        <Link to="/">
          <Navbar.Brand>
            <p className="mt-4 text-3xl">dollaradar</p>
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          {user && (
            <>
              <Navbar.Text>
                Signed in as: <a href="#login">{user}</a>
              </Navbar.Text>
              <Button className="ml-10" onClick={handleLogOut}>
                Log Out
              </Button>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Menubar;

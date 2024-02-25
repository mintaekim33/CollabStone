import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { logoutUser } from "../service/users";

function Menubar(props: any) {
  const { user, setUser } = props;

  function handleLogOut() {
    logoutUser();
    setUser(null);
  }

  return (
    <Navbar className=" bg-blue-300">
      <Container>
        <Navbar.Brand href="#home">Navbar with text</Navbar.Brand>
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

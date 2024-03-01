import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { logoutUser } from "../service/users";
import { Link, useNavigate } from "react-router-dom";

function Menubar(props: any) {
  const { user, setUser } = props;
  const navigate = useNavigate();

  function handleLogOut() {
    logoutUser();
    setUser(null);
    navigate("/");
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
              <Link className="mr-8 no-underline font-bold" to="/">
                <Navbar.Text className="text-white ">Transactions</Navbar.Text>
              </Link>
              <Link className="mr-8 no-underline font-bold" to="/dashboard">
                <Navbar.Text className="text-white ">Dashboard</Navbar.Text>
              </Link>
              <Navbar.Text className="mr-4 text-white font-bold">
                Signed in as: <span className="font-semibold">{user}</span>
              </Navbar.Text>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleLogOut}
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="light">Log In</Button>
              </Link>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Menubar;

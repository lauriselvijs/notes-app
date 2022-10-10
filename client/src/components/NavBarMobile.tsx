import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import ModalForm from "./ModalForm";
import RegisterModal from "./auth/RegisterModal";
import Logout from "./auth/Logout";
import Login from "./auth/LoginModal";

import { Link } from "react-router-dom";

import { useSelector } from "react-redux";
import { State } from "../state/reducers";

const NavBarMobile = () => {
  const { isAuthenticated, user } = useSelector((state: State) => state.auth);

  // Shows loading screen
  const authLinks = (
    <>
      <ModalForm />
      <Nav className="me-auto">
        <Navbar.Text style={{ color: "white" }}>
          {user ? `Welcome ${user.name}` : ""}{" "}
        </Navbar.Text>
        <Logout />
      </Nav>
    </>
  );

  const guestLinks = (
    <Nav className="me-auto">
      <Login />
      <RegisterModal />
    </Nav>
  );

  return (
    <>
      {" "}
      <Navbar fixed="top" bg="dark" variant="dark">
        <Container>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Nav className="me-auto">
            <Navbar.Brand as={Link} to="/">
              Notes
            </Navbar.Brand>
            <Nav.Link as={Link} to="/features">
              Features
            </Nav.Link>
          </Nav>
          {isAuthenticated ? authLinks : guestLinks}
        </Container>
      </Navbar>
    </>
  );
};

export default NavBarMobile;

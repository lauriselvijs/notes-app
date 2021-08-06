import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import ModalForm from "./ModalForm";

import { Link } from "react-router-dom";

const NavBar = ({
  children,
  title,
  onClickShow,
  onClickClose,
  show,
  onAdd,
}) => {
  return (
    <>
      {" "}
      <Navbar fixed="top" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">Notes</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/features">
              Features
            </Nav.Link>
          </Nav>
          {children}
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;

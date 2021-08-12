import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Alert from "react-bootstrap/Alert";

import { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";

import { authActions } from "../../state";
import { errorActions } from "../../state";

import "../../styles/RegisterModal.css";

const RegisterModal = () => {
  const [show, setShow] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const error = useSelector((state) => state.error);

  const dispatch = useDispatch();

  const { register } = bindActionCreators(authActions, dispatch);
  const { clearErrors } = bindActionCreators(errorActions, dispatch);

  // checking for empty input
  const onSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      name,
      email,
      password,
    };

    // Attempt to register
    register(newUser);
  };

  useEffect(() => {
    error.id === "REGISTER_FAIL"
      ? setErrorMsg(error.msg.msg)
      : setErrorMsg(false);

    if (isAuthenticated) {
      setShow(false);
      setName(null);
      setEmail(null);
      setPassword(null);
    }
  }, [error, isAuthenticated]);

  const handleShow = () => setShow(true);
  const handleClose = () => {
    clearErrors();
    setShow(false);
  };
  return (
    <>
      <Nav.Link
        style={{ color: "white" }}
        className="register-modal-nav-link"
        onClick={() => handleShow()}
      >
        Sign Up
      </Nav.Link>

      <Modal show={show} onHide={() => handleClose()}>
        <Modal.Header closeButton>
          <Modal.Title>Register</Modal.Title>
        </Modal.Header>
        {errorMsg && (
          <Alert variant="danger" className="m-2">
            {errorMsg}
          </Alert>
        )}
        <Modal.Body className="register-modal-form">
          <Form onSubmit={onSubmit}>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="John Doe"
                className="mb-3"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="john@gmail.com"
                className="mb-3"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                placeholder="Password"
                className="mb-3"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Modal.Footer>
                <Button variant="danger" onClick={() => handleClose()}>
                  Close
                </Button>
                <Button type="submit" variant="dark">
                  Sign up
                </Button>
              </Modal.Footer>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default RegisterModal;

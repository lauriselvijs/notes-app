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
import { State } from "../../state/reducers";

const RegisterModal = () => {
  const [show, setShow] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | boolean>(false);

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const isAuthenticated = useSelector(
    (state: State) => state.auth.isAuthenticated
  );
  const error = useSelector((state: State) => state.error);

  const dispatch = useDispatch();

  const { register } = bindActionCreators(authActions, dispatch);
  const { clearErrors } = bindActionCreators(errorActions, dispatch);

  // checking for empty input
  const onSubmit = (e: any) => {
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
      setName("");
      setEmail("");
      setPassword("");
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

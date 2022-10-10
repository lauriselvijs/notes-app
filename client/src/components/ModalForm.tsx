import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

import Alert from "react-bootstrap/Alert";

import { useState } from "react";

import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { noteActions } from "../state";

import "../styles/ModalForm.css";

const ModalForm = () => {
  const [show, setShow] = useState(false);
  const [showError, setShowError] = useState(false);

  const [subject, setSubject] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [text, setText] = useState<string>("");

  const dispatch = useDispatch();

  const { addNote } = bindActionCreators(noteActions, dispatch);

  // checking for empty input
  const onSubmit = (e: any) => {
    e.preventDefault();

    if (!text || !author || !subject) {
      setShowError(true);
      setShow(true);
    } else {
      addNote({ subject, author, text });
      setSubject("");
      setAuthor("");
      setText("");
      setShowError(false);
    }
  };

  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
  };
  return (
    <>
      <Button variant="success" onClick={() => handleShow()}>
        Add a note
      </Button>

      <Modal show={show} onHide={() => handleClose()}>
        <Modal.Body className="notes-modal-form">
          <Form onSubmit={onSubmit}>
            <Form.Group>
              <Form.Label>Subject</Form.Label>
              <Form.Control
                type="text"
                placeholder="Subject"
                className="mb-3"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Author</Form.Label>
              <Form.Control
                type="text"
                placeholder="Author"
                className="mb-3"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Note</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Note"
                className="mb-3"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </Form.Group>
            {showError && (
              <Alert variant="danger" className="m-2">
                Please insert all fields
              </Alert>
            )}
            <Modal.Footer>
              <Button variant="danger" onClick={() => handleClose()}>
                Close
              </Button>
              <Button
                type="submit"
                variant="success"
                onClick={() => handleClose()}
              >
                Save
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalForm;

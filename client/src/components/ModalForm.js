import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

import { useState } from "react";

const ModalForm = ({ onClickShow, onClickClose, show, onAdd }) => {
  const [subject, setSubject] = useState();
  const [author, setAuthor] = useState();
  const [text, setText] = useState();

  // checking for empty input
  const onSubmit = (e) => {
    e.preventDefault();

    if (!text || !author || !subject) {
      alert("Please fill missing fields");
      return;
    }

    onAdd({ subject, author, text });
  };
  return (
    <>
      <Button variant="success" onClick={() => onClickShow()}>
        Add a note
      </Button>

      <Modal show={show} onHide={() => onClickClose()}>
        <Modal.Body className="notes-modal-form">
          <Form onSubmit={onSubmit}>
            <Form.Group>
              <Form.Label>Subject</Form.Label>
              <Form.Control
                type="text"
                placeholder="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Author</Form.Label>
              <Form.Control
                type="text"
                placeholder="Author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label className="mb-10">Note</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Note"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </Form.Group>
            <Modal.Footer>
              <Button variant="danger" onClick={() => onClickClose()}>
                Close
              </Button>
              <Button
                type="submit"
                variant="success"
                onClick={() => onClickClose()}
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

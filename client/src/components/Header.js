import PropTypes from "prop-types";
import ModalForm from "./ModalForm";
import Card from "react-bootstrap/Card";

const Header = ({ title, onClickShow, onClickClose, show, onAdd }) => {
  return (
    <header className="header">
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>
            <h1>{title}</h1>
          </Card.Title>
          <Card.Text>Write down some notes</Card.Text>
          <ModalForm
            onClickShow={onClickShow}
            onClickClose={onClickClose}
            show={show}
            onAdd={onAdd}
          />
        </Card.Body>
      </Card>
    </header>
  );
};

Header.defaultProps = {
  title: "Notes",
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;

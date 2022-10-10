import { Link } from "react-router-dom";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <hr />
      <p className="copyright-year">
        Copyright &copy; {new Date().getFullYear()}
      </p>
      <Link to="/about">About</Link>
    </footer>
  );
};

export default Footer;

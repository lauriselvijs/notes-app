import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <hr />
      <p className="copyright-year">Copyright &copy; 2021</p>
      <Link to="/about">About</Link>
    </footer>
  );
};

export default Footer;

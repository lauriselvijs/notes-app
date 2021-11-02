import React from "react";

import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";

import Nav from "react-bootstrap/Nav";

import { authActions } from "../../state";

const Logout = () => {
  //const error = useSelector((state) => state.error);

  const dispatch = useDispatch();
  const { logout } = bindActionCreators(authActions, dispatch);

  return (
    <>
      <Nav.Link style={{ color: "white" }} onClick={() => logout()} href="#">
        Logout
      </Nav.Link>
    </>
  );
};

export default Logout;

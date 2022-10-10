import React, { useEffect } from "react";

import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { authActions } from "./state";

import Notes from "./components/Notes";
import Footer from "./components/Footer";
import About from "./components/About";
import NavBar from "./components/NavBar";
import Features from "./components/Features";

import { BrowserRouter as Router, Route } from "react-router-dom";

const App = () => {
  const dispatch = useDispatch();

  const { loadUser } = bindActionCreators(authActions, dispatch);

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <div>
      <Router>
        <div className="app">
          <NavBar />
          <Route
            path="/"
            exact
            render={(props) => (
              <>
                <NavBar />
                <Notes />
              </>
            )}
          />
          <Route path="/about" component={About} />
          <Route path="/features" component={Features} />
          <Footer />
        </div>
      </Router>
    </div>
  );
};

export default App;

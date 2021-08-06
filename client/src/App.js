import Notes from "./components/Notes";
import Footer from "./components/Footer";
import About from "./components/About";
import NavBar from "./components/NavBar";
import Features from "./components/Features";
import ModalForm from "./components/ModalForm";

import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

const App = () => {
  const [show, setShow] = useState(false);

  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const getNotes = async () => {
      const notesFromServer = await fetchNotes();
      setNotes(notesFromServer);
    };

    getNotes();
  }, []);

  // Fetch Notes
  const fetchNotes = async () => {
    const res = await fetch("/api/v1/notes");
    const data = await res.json();
    return data.data;
  };

  // Add Notes
  const addNote = async (note) => {
    const res = await fetch("/api/v1/notes", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(note),
    });

    const data = await res.json();
    setNotes([...notes, data.data]);
  };

  // Delete notes
  const deleteNote = async (id) => {
    await fetch(`/api/v1/notes/${id}`, {
      method: "DELETE",
    });

    setNotes(notes.filter((note) => note._id !== id));
  };

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <Router>
      <div className="app">
        <NavBar />
        <Route
          path="/"
          exact
          render={(props) => (
            <>
              <NavBar>
                <ModalForm
                  onAdd={addNote}
                  onClickShow={handleShow}
                  onClickClose={handleClose}
                  show={show}
                />
              </NavBar>
              <Notes notes={notes} onDelete={deleteNote} />
            </>
          )}
        />
        <Route path="/about" component={About} />
        <Route path="/features" component={Features} />

        <Footer />
      </div>
    </Router>
  );
};

export default App;

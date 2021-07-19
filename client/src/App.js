import Header from "./components/Header";
import Notes from "./components/Notes";
import Footer from "./components/Footer";
import About from "./components/About";

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

  // fetch Notes
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
        <Route
          path="/"
          exact
          render={(props) => (
            <>
              <Header
                onAdd={addNote}
                onClickShow={handleShow}
                onClickClose={handleClose}
                show={show}
              />
              <Notes notes={notes} onDelete={deleteNote} />
            </>
          )}
        />
        <Route path="/about" component={About} />
        <Footer />
      </div>
    </Router>
  );
};

export default App;

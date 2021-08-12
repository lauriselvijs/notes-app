import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { noteActions } from "../state";

import Note from "./Note";
import "../styles/Notes.css";

// creating new notes from notes array
const Notes = () => {
  const notes = useSelector((state) => state.note.notes);
  const dispatch = useDispatch();

  const { getNotes, deleteNote, clearState } = bindActionCreators(
    noteActions,
    dispatch
  );
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    isAuthenticated ? getNotes() : clearState();
  }, [isAuthenticated]);

  return (
    <div className="notes">
      {notes.map((note) => (
        <Note
          key={note._id}
          note={note}
          onDelete={() => deleteNote(note._id)}
        />
      ))}
    </div>
  );
};

export default Notes;

import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { noteActions } from "../state";
import { State } from "../state/reducers";

import Note from "./Note";
import "../styles/Notes.css";

// creating new notes from notes array
const Notes = () => {
  const notes = useSelector((state: State) => state.note.notes);
  const dispatch = useDispatch();

  const { getNotes, deleteNote, clearState } = bindActionCreators(
    noteActions,
    dispatch
  );
  const isAuthenticated = useSelector(
    (state: State) => state.auth.isAuthenticated
  );

  useEffect(() => {
    isAuthenticated ? getNotes() : clearState();
  }, [isAuthenticated]);

  return (
    <div className="notes">
      {notes.map(
        (note: {
          _id: string;
          text: string;
          author: string;
          subject: string;
        }) => (
          <Note
            key={note._id}
            note={note}
            onDelete={() => deleteNote(note._id)}
          />
        )
      )}
    </div>
  );
};

export default Notes;

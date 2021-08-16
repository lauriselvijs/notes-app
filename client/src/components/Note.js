import React from "react";
import { BsFillTrashFill } from "react-icons/bs";
import "../styles/Note.css";

// outputting information from notes array
const Note = ({ note, onDelete }) => {
  return (
    <div className="note">
      <div className="note-text">
        {note.text}, {note.author} <br />
        Subject: {note.subject}
      </div>
      <BsFillTrashFill
        className="bs-fill-trash-fill"
        onClick={() => onDelete(note._id)}
      />
    </div>
  );
};

export default Note;

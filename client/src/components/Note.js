import React from "react";
import { BsFillTrashFill } from "react-icons/bs";

// outputting information from notes array
const Note = ({ note, onDelete }) => {
  return (
    <div className="note">
      <h3 className="note-text"> {note.text}</h3>
      <span> Subject: {note.subject}</span>
      <span> Author: {note.author}</span>
      <BsFillTrashFill
        className="bs-fill-trash-fill"
        onClick={() => onDelete(note._id)}
      />
    </div>
  );
};

export default Note;

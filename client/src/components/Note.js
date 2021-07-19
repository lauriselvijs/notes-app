import React from "react";
import { BsFillTrashFill } from "react-icons/bs";

const Note = ({ note, onDelete }) => {
  return (
    <div className="note">
      <h3 className="note-text"> {note.text}</h3>
      {/*<p> Subject: {note.subject}</p>
      <p> Author: {note.author}</p> */}
      <BsFillTrashFill
        className="bs-fill-trash-fill"
        onClick={() => onDelete(note._id)}
      />
    </div>
  );
};

export default Note;

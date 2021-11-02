import React from "react";
import { BsFillTrashFill } from "react-icons/bs";
import { Dispatch } from "redux";
import "../styles/Note.css";

interface INote {
  note: {
    _id: string;
    text: string;
    author: string;
    subject: string;
  };
  onDelete: (
    id?: string
  ) => (dispatch: Dispatch<any>, getState: () => void) => Promise<any>;
}

// outputting information from notes array
const Note = ({ note, onDelete }: INote) => {
  return (
    <div className="note">
      <div className="note-text">
        {note.text}, {note.author} <br />
        Subject: {note.subject}
      </div>
      <BsFillTrashFill
        className="bs-fill-trash-fill"
        onClick={() => onDelete()}
      />
    </div>
  );
};

export default Note;

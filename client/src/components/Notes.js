import Note from "./Note";
import "../styles/Notes.css";

// creating new notes from notes array
const Notes = ({ notes, onDelete }) => {
  return (
    <div className="notes">
      {notes.map((note) => (
        <Note key={note._id} note={note} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default Notes;

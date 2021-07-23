import Note from "./Note";

// creating new notes from notes array
const Notes = ({ notes, onDelete }) => {
  return (
    <>
      {notes.map((note) => (
        <Note key={note._id} note={note} onDelete={onDelete} />
      ))}
    </>
  );
};

export default Notes;

import Note from "./Note";

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

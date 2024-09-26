import React from "react";
import "../styles/Note.css"

function Note({ note, onDelete }) {
    const formattedDate = new Date(note.created_at).toLocaleDateString("en-US")
  return (
    <div className="note-container">
      <p className="note-gender">{note.gender}</p>
      <p className="note-ethnicity">{note.ethnicity}</p>
      <p className="note-parental_level_of_education">{note.parental_level_of_education}</p>
      <p className="note-lunch">{note.lunch}</p>
      <p className="note-test_preparation_course">{note.test_preparation_course}</p>
      <p className="note-reading_score">{note.reading_score}</p>
      <p className="note-writing_score">{note.writing_score}</p>
      <p className="note-date">{formattedDate}</p>
      <button className="delete-button" onClick={() => onDelete(note.id)}>
        Delete
      </button>
    </div>
  );
}
export default Note

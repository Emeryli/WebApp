//import
import { useState, useEffect } from "react";
import api from "../api";
import Note from "../components/Note";
import "../styles/Home.css";

function Home() {
  // const
  const [gender, setGender] = useState("");
  const [ethnicity, setEthnicity] = useState("");
  const [parental_level_of_education, setParental_level_of_education] =
    useState("");
  const [lunch, setLunch] = useState("");
  const [test_preparation_course, setTest_preparation_course] = useState("");
  const [reading_score, setReading_score] = useState(0.0);
  const [writing_score, setWriting_score] = useState(0.0);

  const [content, setContent] = useState("");
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    getNotes();
  }, []);

  //getNotes
  const getNotes = () => {
    api
      .get("api/notes/")
      .then((res) => res.data)
      .then((data) => {
        setNotes(data);
        console.log(data);
      })
      .catch((err) => alert(err));
  };

  // delete notes
  const deleteNote = (id) => {
    api
      .delete(`api/notes/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) alert("Note deleted");
        else alert("Failed to delete note");
        getNotes();
      })
      .catch((error) => alert(error));
  };

  // create notes
  const createNotes = (e) => {
    e.preventDefault();
    api
      .post("api/notes/", {
        gender,
        ethnicity,
        test_preparation_course,
        reading_score,
        writing_score,
        parental_level_of_education,
        lunch,
      })
      .then((res) => {
        if (res.status === 201) alert("Note created");
        else alert("Failed to create note");
        getNotes();
        setGender("");
        
      })
      .catch((err) => {
        alert(err);
      });
  };
  // return html
  return (
    <div>
      <div>
        <h2>Notes</h2>
        {/* render the list of notes  */}
        {notes.map((note) => {
          return <Note note={note} onDelete={deleteNote} key={note.id} />;
        })}
      </div>
      <h2>Create a Note</h2>
      <form onSubmit={createNotes}>
        <label htmlFor="gender">Gender:</label>
        <br />
        <select
          id="gender"
          name="gender"
          onChange={(e) => setGender(e.target.value)}
          required
          value={gender}
        >
          <option value="" disabled selected>
            Select Gender
          </option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <br />
        <label htmlFor="ethnicity">Ethnicity:</label>
        <br />
        <select
          id="ethnicity"
          name="ethnicity"
          onChange={(e) => setEthnicity(e.target.value)}
          required
          value={ethnicity}
        >
          <option value="" disabled selected>
            Select Ethnicity
          </option>
          <option value="group A">Group A</option>
          <option value="group B">Group B</option>
          <option value="group C">Group C</option>
          <option value="group D">Group D</option>
        </select>
        <br />
        <label htmlFor="parental_level_of_education">
          Parental Education Level:
        </label>
        <br />
        <select
          id="parental_level_of_education"
          name="parental_level_of_education"
          onChange={(e) => setParental_level_of_education(e.target.value)}
          required
          value={parental_level_of_education}
        >
          <option value="" disabled selected>
            Select Parental Education Level
          </option>
          <option value="associate's degree">Associate's Degree</option>
          <option value="bachelor's degree">Bachelor's Degree</option>
          <option value="high school">High school</option>
          <option value="master's degree">Master's degree</option>
          <option value="some college">Some college</option>
          <option value="some high school">Some high school</option>
        </select>
        <br />
        <label htmlFor="lunch">Lunch:</label>
        <br />
        <select
          id="lunch"
          name="lunch"
          onChange={(e) => setLunch(e.target.value)}
          required
          value={lunch}
        >
          <option value="" disabled selected>
            Select Lunch
          </option>
          <option value="free/reduced">Free/Reduced</option>
          <option value="standard">Standard</option>
        </select>
        <br />
        <label htmlFor="test_preparation_course">Test Prep Course:</label>
        <br />
        <select
          id="test_preparation_course"
          name="test_preparation_course"
          onChange={(e) => setTest_preparation_course(e.target.value)}
          required
          value={test_preparation_course}
        >
          <option value="" disabled selected>
            Select Test Prep Course
          </option>
          <option value="none">None</option>
          <option value="completed">Completed</option>
        </select>
        <br />
        <label htmlFor="reading_score">Reading Score:</label>
        <br />
        <input
          onChange={(e) => setReading_score(e.target.value)}
          type="number"
          step="0.01"
          name="reading_score"
          id="reading_score"
          placeholder="Enter your Reading score"
          min="0"
          max="100"
          value={reading_score}
        />
        <br />
        <label htmlFor="writing_score">Writing Score:</label>
        <br />
        <input
          onChange={(e) => setWriting_score(e.target.value)}
          type="number"
          step="0.01"
          name="writing_score"
          id="writing_score"
          placeholder="Enter your Writing score"
          min="0"
          max="100"
          value={writing_score}
        />
        <br />
        <input type="submit" value="Submit"></input>
      </form>
    </div>
  );
}
export default Home;

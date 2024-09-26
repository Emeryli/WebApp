import { useState, useEffect } from "react";
import api from "../api";
import Note from "../components/Note";
import "../styles/Home.css";

function TestForm() {
  const [gender, setGender] = useState("");

  const handleChange = (event) => {
    setGender(event.target.value);
  };

  return (
    <div>
      <h2>Input Test</h2>
     
    </div>
  );
}
export default TestForm;

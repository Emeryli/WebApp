import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import api from "../api";
import "../styles/Form.css";
import LoadingIndicator from "./LoadingIndicator";
import { Link } from "react-router-dom";

function Form({ route, method }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isDisabled, setDisable] = useState(true);
  const name = method === "login" ? "Login" : "Register";

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const res = await api.post(route, { username, password });
      if (method === "login") {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        navigate("/");
      } else {
        navigate("/login");
      }
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  const checkInput = () => {
    if (username.trim() !== "" && password.trim() !== "") {
      setDisable(false);
    } else setDisable(true);
  };

  useEffect(() => {
    checkInput();
  }, [username, password]);

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h1>{name}</h1>
      <input
        className="form-input"
        type="text"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
        placeholder="Username"
      />
      <input
        className="form-input"
        type="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        placeholder="Password"
      />
      { name  == "Login" ? (
        <Link to="/register" className="link">Doesn't have a account? Register Now!</Link>
      ) : (
        <Link to="/login" className="link">Have a account? Login Now!</Link>
      )}

      {loading && <LoadingIndicator />}
      
      <button className="form-button" type="submit" disabled={isDisabled}>
        {name}
      </button>
    </form>
  );
}
export default Form;

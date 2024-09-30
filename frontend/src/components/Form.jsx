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
  const [shake, setShake] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
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
      setShake(true);
      if (name == "Login") {
        setErrorMessage("Username and password don't match");
      } else {
        setErrorMessage("Username exists");
      }
      setTimeout(() => {
        setShake(false);
      }, 500);
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
        className={`form-input ${shake ? "error" : ""}`}
        type="text"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
          setShake(false);
          setErrorMessage('');
        }}
        placeholder="Username"
      />
      <input
        className={`form-input ${shake ? "error" : ""}`}
        type="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          setShake(false);
          setErrorMessage('');

        }}
        placeholder="Password"
      />
      {errorMessage && name == "Login" ? (
        <p className="error-message">{errorMessage}</p>
      ) : (
        ""
      )}
      {errorMessage && name == "Register" ? (
        <p className="error-message">{errorMessage}</p>
      ) : (
        ""
      )}
      {name == "Login" ? (
        <Link to="/register" className="link">
          Doesn't have a account? Register Now!
        </Link>
      ) : (
        <Link to="/login" className="link">
          Have a account? Login Now!
        </Link>
      )}

      <button className="form-button" type="submit" disabled={isDisabled}>
        {name}
      </button>
    </form>
  );
}
export default Form;

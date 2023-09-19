import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import LoginValidator from "../../validators/LoginValidator";

import "./styles.css";

const LoginForm = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState({});

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // validation part
    const validationErrors = LoginValidator(data);

    if (Object.keys(validationErrors).length > 0)
      setValidationErrors(validationErrors);
    else {
      // server request with valid data
      try {
        const url = "http://localhost:8080/api/person/login";
        const { data: res } = await axios.post(url, data);
        sessionStorage.setItem("person_id", res.personId);
        sessionStorage.setItem("nickname", res.nickname);
        window.location = "/";
      } catch (error) {
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status <= 500
        ) {
          setError(error.response.data.message);
        }
      }
    }
  };

  return (
    <div className="login-form-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2 className="form-title">Login Form</h2>
        <input
          type="email"
          placeholder="email"
          name="email"
          onChange={handleChange}
          value={data.email}
          required
          className="form-input"
        />
        {validationErrors.email && (
          <p className="form-error">{validationErrors.email}</p>
        )}
        <input
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
          value={data.password}
          required
          className="form-input"
        />
        {validationErrors.password && (
          <p className="form-error">{validationErrors.password}</p>
        )}
        <button type="submit" className="form-button">
          Login
        </button>
      </form>
      {error && <p className="form-error">{error}</p>}
      <div className="register-link">
        <Link to="/register">Register</Link>
      </div>
    </div>
  );
};
export default LoginForm;

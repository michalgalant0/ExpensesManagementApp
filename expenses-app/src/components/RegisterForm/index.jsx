import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import RegisterValidator from "../../validators/RegisterValidator";

import "./styles.css";

const RegisterForm = () => {
  const [data, setData] = useState({
    nickname: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState({});

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // validation part
    const validationErrors = RegisterValidator(data);

    if (Object.keys(validationErrors).length > 0)
      setValidationErrors(validationErrors);
    else {
      try {
        const url = "http://localhost:8080/api/person/register";
        await axios.post(url, data);
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
    <div className="register-form-container">
      <form onSubmit={handleSubmit} className="register-form">
        <h2 className="form-title">Create Account</h2>
        <input
          type="text"
          placeholder="nickname"
          name="nickname"
          onChange={handleChange}
          value={data.nickname}
          required
          className="form-input"
        />
        {validationErrors.nickname && (
          <p className="form-error">{validationErrors.nickname}</p>
        )}
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
          Register
        </button>
      </form>
      {error && <p className="form-error">{error}</p>}
      <div className="login-link">
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
};
export default RegisterForm;

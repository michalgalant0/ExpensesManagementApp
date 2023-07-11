import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import "./styles.css";

const RegisterForm = () => {
  const [data, setData] = useState({
    nickname: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
  };

  return (
    <div className="register-form-container">
      <form onSubmit={handleSubmit} className="register-form">
        <h2 className="form-title">Create Account</h2>
        <input
          type="text"
          placeholder="Nickname"
          name="nickname"
          onChange={handleChange}
          value={data.nickname}
          required
          className="form-input"
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          onChange={handleChange}
          value={data.email}
          required
          className="form-input"
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleChange}
          value={data.password}
          required
          className="form-input"
        />
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

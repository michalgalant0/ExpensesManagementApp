import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import "./styles.css";

const LoginForm = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
  };

  return (
    <div className="login-form-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2 className="form-title">Login Form</h2>
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

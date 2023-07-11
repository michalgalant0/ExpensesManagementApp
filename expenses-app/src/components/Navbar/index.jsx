import React from "react";
import { Link } from "react-router-dom";

import "./styles.css";

const Navbar = () => {
  const handleLogout = () => {
    sessionStorage.removeItem("person_id");
    sessionStorage.removeItem("nickname");
    window.location = "/login";
  };

  return (
    <nav>
      <div className="navbar-brand">ExpensesApp</div>
      <ul className="navbar-menu">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/transactions">Transaction List</Link>
        </li>
        <li className="navbar-logout">
          <button onClick={handleLogout}>Logout</button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

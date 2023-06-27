import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/transaction-list">Transaction List</Link>
    </nav>
  );
};

export default Navbar;

import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/transactions">Transaction List</Link>
    </nav>
  );
};

export default Navbar;

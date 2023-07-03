import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const handleLogout = () => {
    sessionStorage.removeItem('person_id')
    window.location = '/login'
  }

  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/transactions">Transaction List</Link>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  )
}

export default Navbar;

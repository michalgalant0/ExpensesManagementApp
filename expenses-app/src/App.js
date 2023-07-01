import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar';
import HomePage from './views/HomePage';
import TransactionsPage from './views/TransactionsPage';
import LoginPage from './views/LoginPage';
import RegisterPage from './views/RegisterPage';

import { TransactionProvider } from './TransactionContext';

function App() {
  const user = sessionStorage.getItem('user_id');

  return (
    <TransactionProvider>
      <Router>
        {user && <Navbar />}
        <Routes>
          {!user ? (
            <React.Fragment>
              <Route path='/' element={<LoginPage />} />
              <Route path='/register' element={<RegisterPage />} />
              <Route path='/*' element={<Navigate to='/' />} />
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Route path='/' element={<HomePage />} />
              <Route path='/transactions' element={<TransactionsPage />} />
            </React.Fragment>
          )}
        </Routes>
      </Router>
    </TransactionProvider>
  );
}

export default App;

// coś probuje dzialac
{/* <TransactionProvider>
<Router>
  {user && <Navbar />}
  <Routes>
    {user && <Route path='/' exact element={<HomePage />} />}
    <Route path='/login' exact element={<LoginPage />} />
    <Route path='/register' exact element={<RegisterPage />} />
    <Route path='/' element={<Navigate replace to='/login' />} />
    <Route path='/transactions' exact element={<TransactionsPage />} />
  </Routes>
</Router>
</TransactionProvider> */}